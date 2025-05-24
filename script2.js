function initCharacter() {
  const thingthing = document.getElementById("nameInput");
  localStorage.setItem("name", thingthing.value);
  window.location.href = "/index.html";
}
