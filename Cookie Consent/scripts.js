document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptButton = document.getElementById("acceptCookies");
  const closeButton = document.getElementById("closeBanner");

  // Kiểm tra nếu người dùng đã đồng ý cookies trước đó
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (cookieConsent === "true") {
    cookieBanner.style.display = "none";
  }

  // Khi người dùng nhấn "I like Cookies"
  acceptButton.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "true");
    cookieBanner.style.display = "none";
  });

  // Đóng banner khi nhấn dấu "✖"
  closeButton.addEventListener("click", () => {
    cookieBanner.style.display = "none";
  });
});
