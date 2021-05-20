window.addEventListener("load", () => {
    const headerLinkEls = document.querySelectorAll("header a:not(#header__logo):not(.write-zweet)");
    for (let i = 0; i < headerLinkEls.length; i++) {
        const currentEl = headerLinkEls[i];
        if (currentEl.querySelector("span").innerText !== "Profile" ? currentEl.pathname.split("/")[1] === window.location.pathname.split("/")[1] : currentEl.pathname === window.location.pathname) {
            currentEl.classList.add("current-location");
        };
    };
});