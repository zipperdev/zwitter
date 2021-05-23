const addCurrentLocation = (location) => {
    window.addEventListener("load", () => {
        const headerLinkEls = document.querySelectorAll("header a:not(#header__logo):not(.write-zweet)");
        for (let i = 0; i < headerLinkEls.length; i++) {
            const currentEl = headerLinkEls[i];
            if (currentEl.querySelector("span").innerText !== "Profile" ? currentEl.pathname.split("/")[1] === location.pathname.split("/")[1] : currentEl.pathname === location.pathname) {
                currentEl.classList.add("current-location");
            };
        };
    });
};

export default addCurrentLocation;