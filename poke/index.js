function getCharacters(done) {
    const results = fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    results
        .then(response => response.json())
        .then(data => {
            done(data.results);
        });
}

getCharacters(data => {
    data.forEach(pokemon => {
        const article = document.createElement("article");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        const image = document.createElement("img");

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");
        infoContainer.style.display = "none"; // Ocultar información adicional inicialmente

        fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
                image.src = pokemonData.sprites.front_default;
                image.alt = pokemonData.name;

                // Crear un elemento h2 para mostrar el nombre junto con la imagen
                const name = document.createElement("h2");
                name.textContent = pokemonData.name;

                // Agregar el nombre y la imagen al contenedor de la imagen
                imageContainer.appendChild(name);
                imageContainer.appendChild(image);
            });

        article.appendChild(imageContainer);
        article.appendChild(infoContainer);

        const main = document.querySelector("main");
        main.appendChild(article);

        // Agregar el controlador de eventos de clic solo al contenedor de la imagen
        imageContainer.addEventListener("click", () => {
            // Mostrar u ocultar información adicional al hacer clic en la tarjeta del Pokémon
            if (infoContainer.style.display === "none") {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        infoContainer.innerHTML = `
                            <p>Height: ${pokemonData.height}</p>
                            <p>Weight: ${pokemonData.weight}</p>
                            <p>Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(", ")}</p>
                            <p>Types: ${pokemonData.types.map(type => type.type.name).join(", ")}</p>
                        `;
                        infoContainer.style.display = "block";
                    });
            } else {
                infoContainer.style.display = "none"; // Ocultar información adicional si ya estaba visible
            }
        });
    });
});
