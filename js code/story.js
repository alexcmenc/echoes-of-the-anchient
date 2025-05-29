class Story {
  constructor(image, text) {
    this.image = image;
    this.text = text;
  }
}

const storyScene = [
  new Story(
    "./images/intro-story/scene-1.png",
    "Long ago, peace reigned across the Emerald Vales, watched over by the ancient realm of Aetherwyn and guarded by the wisdom of the High Council."
  ),
  new Story(
    "./images/intro-story/scene-2.png",
    "Goblins, once banished to the forgotten underhollows, have risen in vast numbers. They burn fields, raid villages, and tear through the forest borders with fury and strange new magic. Behind it all, high above the shattered peaks, a great dragon stirs — a beast of legend, bound to no master, feared even by the goblins themselves. The final battle is coming."
  ),
  new Story(
    "./images/intro-story/scene-3.png",
    "The final battle is coming. The Council has called for help, and I have waited long for this moment. You were seen in the scrolls... a figure from distant lands, drawn to the storm. The people of Aetherwyn need a name to stand behind. A name to inspire hope, and to lead the charge when the ancient echoes rise again."
  ),
];

let currentSceneIndex = 0;

function displayScene() {
  const storyStage = storyScene[currentSceneIndex];
  document.querySelector("#story-image").src = storyStage.image;
  document.querySelector("#story-text").textContent = storyStage.text;
  storyImage.style.animation = "none";
  void storyImage.offsetWidth;
  storyImage.style.animation = "fadeIn 2s ease";
  storyText.style.animation = "none";
  void storyText.offsetWidth;
  storyText.style.animation = "fadeIn 2s ease forwards";
}
document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("next-button");

  nextBtn.addEventListener("click", () => {
    currentSceneIndex++;
    if (currentSceneIndex < storyScene.length) {
      displayScene();
    } else {
      screenDisplayed("name");
    }
  });
});
