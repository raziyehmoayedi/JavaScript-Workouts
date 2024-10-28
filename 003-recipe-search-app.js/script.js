const searchBox = document.querySelector(".search-box");
const loading = document.querySelector(".loading");
const grid = document.querySelector(".grid");
const template = document.querySelector(".box-templatex");
const notFound = document.querySelector(".not-found");



const url =
  "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=italian%20wedding%20soup";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "386f7ea851msh9b02f6531651a42p10b1b8jsn1638abface49",
    "x-rapidapi-host": "recipe-by-api-ninjas.p.rapidapi.com",
  },
};

async function fetchData() {
    try {
      loading.style.display = "block";
      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      updateUI(data);
    } catch (error) {
      console.error(error);
      if (!navigator.onLine) {
        alert("No internet connection. Please check your network and try again.");
      } else {
        alert("Error fetching data: " + error.message);
      }
    } finally {
      loading.style.display = "none";
    }
  }

function updateUI(data) {
  grid.innerHTML = "";
  notFound.style.display = "none";
  data.forEach((recipe) => {
    const box = template.cloneNode(true);
    box.style.display = "block";

    const title = box.querySelector(".title");
    const ingredients = box.querySelector(".ingredients");
    const servings = box.querySelector(".servings");

    function truncateWords(str, numWord) {
      const words = String(str).split(" ");
      return words.length > numWord
        ? words.slice(0, numWord).join(" ") + "..."
        : str;
    }

    title.textContent = truncateWords(recipe.title, 2);
    ingredients.textContent = truncateWords(recipe.ingredients, 20);
    servings.textContent = `Servings: ${recipe.servings}`;

    console.log(typeof recipe.title);

    grid.appendChild(box);
  });
}

searchBox.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const recipeBoxes = grid.querySelectorAll(".box-templatex");


  let found = false;
  recipeBoxes.forEach((box) => {
    const title = box.querySelector(".title").textContent.toLowerCase();
    if (title.startsWith(query)) {
      box.style.display = "block";
      found = true;
    } else {
      box.style.display = "none";
    }
  });

  notFound.style.display = found ? "none" : "block";
});

fetchData();
