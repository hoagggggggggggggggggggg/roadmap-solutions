document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://api.github.com/search/repositories";
    const selectElement = document.querySelector(".select-wrapper select");
    const refreshButton = document.querySelector(".refresh-button");
    const retryButton = document.querySelector(".retry-button");

    const states = {
        empty: document.querySelector(".empty-state"),
        loading: document.querySelector(".loading-state"),
        error: document.querySelector(".error-state"),
        result: document.querySelector(".result-state"),
    };

    const cache = new Map();

    function switchState(state) {
        for (const key in states) {
            states[key].style.display = key === state ? "block" : "none";
        }
    }

    async function fetchRandomRepository(language, retries = 3) {
        if (cache.has(language)) {
            console.log("Using cached data");
            displayRandomRepository(cache.get(language));
            switchState("result");
            return;
        }

        switchState("loading");

        try {
            const response = await fetch(`${API_URL}?q=language:${language}+stars:>500+pushed:>2022-01-01&sort=stars&order=desc&per_page=20`);

            if (response.status === 403) {
                const resetTime = response.headers.get("x-ratelimit-reset");
                if (resetTime) {
                    const retryAfter = Math.max(0, resetTime * 1000 - Date.now());
                    throw new Error(`Rate limit exceeded. Please retry after ${Math.ceil(retryAfter / 1000)} seconds.`);
                }
                throw new Error("Rate limit exceeded. Please try again later.");
            }

            if (!response.ok) throw new Error("Failed to fetch repositories");

            const data = await response.json();
            if (data.items.length === 0) throw new Error("No repositories found");

            cache.set(language, data.items);
            displayRandomRepository(data.items);
            switchState("result");
        } catch (error) {
            console.error(error);

            if (retries > 0) {
                console.log(`Retrying... (${retries} retries left)`);
                setTimeout(() => fetchRandomRepository(language, retries - 1), 2000);
            } else {
                switchState("error");
                const errorMessage = document.querySelector(".error-message");
                errorMessage.textContent = error.message;
            }
        }
    }

    function displayRandomRepository(repos) {
        const randomRepo = repos[Math.floor(Math.random() * repos.length)];

        const repoCard = document.querySelector(".repository-card");
        const repoLink = repoCard.querySelector(".repo-link");
        const stats = repoCard.querySelector(".stats");

        // Update repository details
        repoLink.textContent = randomRepo.name;
        repoLink.href = randomRepo.html_url;
        repoCard.querySelector("p").textContent = randomRepo.description || "No description available";

        // Update repository stats
        stats.querySelector(".language").textContent = randomRepo.language || "Unknown";
        stats.querySelector(".stars").textContent = `★ ${randomRepo.stargazers_count.toLocaleString()}`;
        stats.querySelector(".forks").textContent = `⑂ ${randomRepo.forks_count.toLocaleString()}`;
        stats.querySelector(".issues").textContent = `◎ ${randomRepo.open_issues_count.toLocaleString()}`;
    }

    selectElement.addEventListener("change", () => {
        const selectedLanguage = selectElement.value;
        if (selectedLanguage) fetchRandomRepository(selectedLanguage);
    });

    refreshButton.addEventListener("click", () => {
        const selectedLanguage = selectElement.value;
        if (selectedLanguage) fetchRandomRepository(selectedLanguage);
    });

    retryButton.addEventListener("click", () => {
        const selectedLanguage = selectElement.value;
        if (selectedLanguage) fetchRandomRepository(selectedLanguage);
    });

    // Initial state
    switchState("empty");
});
