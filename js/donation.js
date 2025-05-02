import { ELEMENTS } from './config.js';
import { donationContent } from './messages.js';

class DonationTracker {
    constructor() {
        this.reset();
    }

    reset() {
        this.clickCount = 0;
        this.usedMessages = [];
        this.usedInteractions = [];
    }

    getContent() {
        const trackerData = { clickCount: this.clickCount };

        // First visit shows initial message
        if (this.clickCount === 1) {
            return { ...donationContent.initialMessage, tracker: trackerData };
        }

        // After 5+ clicks, show interaction every 3rd click
        if (this.clickCount >= 5 && (this.clickCount - 3) % 3 === 2) {
            if (this.usedInteractions.length >= donationContent.interactions.length) {
                this.usedInteractions = [];
            }

            const available = donationContent.interactions.filter(
                int => !this.usedInteractions.includes(int.greeting)
            );
            const interaction = available.length ?
                available[Math.floor(Math.random() * available.length)] :
                donationContent.interactions[0];

            this.usedInteractions.push(interaction.greeting);
            return { ...interaction, tracker: trackerData };
        }

        // Regular messages
        if (this.usedMessages.length >= donationContent.messages.length) {
            this.usedMessages = [];
        }

        const available = donationContent.messages.filter(
            msg => !this.usedMessages.includes(msg.greeting)
        );
        const message = available.length ?
            available[Math.floor(Math.random() * available.length)] :
            donationContent.messages[0];

        this.usedMessages.push(message.greeting);
        return { ...message, tracker: trackerData };
    }

    incrementClickCount() {
        this.clickCount++;
    }
}

const donationTracker = new DonationTracker();

function updateDonationContent() {
    const rawContent = donationTracker.getContent();

    const processField = (field) => {
        return typeof field === 'function' ? field(rawContent.tracker) : field;
    };

    const content = {
        emoji: rawContent.emoji,
        greeting: processField(rawContent.greeting),
        message: processField(rawContent.message),
        footer: processField(rawContent.footer)
    };

    const isInteraction = donationContent.interactions.some(
        int => int.greeting === rawContent.greeting
    );

    return `
        <div class="donation-icon">${content.emoji}</div>
        <p class="desc-title">
            ${isInteraction ? `<span class="secret">(Secret Message)</span><br>` : ''}
            ${content.greeting}
        </p>
        <p class="desc-text">${content.message}</p>
        <div class="donation-choice">
            <a href="https://patreon.com/example" target="_blank" rel="noopener">
                <button class="button-64" role="button">
                    <span class="text">Monthly</span>
                </button>
            </a>
            <a href="https://paypal.com/example" target="_blank" rel="noopener">
                <button class="button-64" role="button">
                    <span class="text">One-time</span>
                </button>
            </a>
        </div>
        <p class="desc-text">${content.footer}</p>
    `;
}

function initializeDonationContent() {
    const container = document.getElementById(ELEMENTS.donationContent);
    if (container) {
        container.innerHTML = updateDonationContent();
    }
}

function handleDonationButtonClick() {
    donationTracker.incrementClickCount();
    initializeDonationContent();

    const donationTab = document.getElementById(ELEMENTS.donationTab);
    if (donationTab) {
        donationTab.classList.add('show');
        donationTab.classList.remove('hidden');
    }
}

function setupDonationEvents() {
    const supportBtn = document.getElementById(ELEMENTS.supportDevBtn);
    const hideBtn = document.getElementById(ELEMENTS.hideDonationTab);

    if (supportBtn) {
        supportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleDonationButtonClick();
        });
    }

    if (hideBtn) {
        hideBtn.addEventListener('click', () => {
            const donationTab = document.getElementById(ELEMENTS.donationTab);
            if (donationTab) {
                donationTab.classList.remove('show');
                donationTab.classList.add('hidden');
            }
            donationTracker.reset();
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeDonationContent();
        setupDonationEvents();
    });
} else {
    initializeDonationContent();
    setupDonationEvents();
}

export {
    donationTracker,
    initializeDonationContent,
    handleDonationButtonClick,
    setupDonationEvents
};