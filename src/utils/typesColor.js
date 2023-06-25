//Funzione per prendere i colori in base al tipo del pokemon
export const colorTypeGradients = (type1, type2, length) => {
    //tipo pokemon - colore
    const colors = {
        grass: "#a8ff98",
        poison: "#d6a2e4",
        normal: "#dcdcdc",
        fire: "#ffb971",
        water: "#8cc4e2",
        electric: "#ffe662",
        ice: "#8cf5e4",
        fighting: "#da7589",
        ground: "#e69a74",
        flying: "#bbc9e4",
        psychic: "#ffa5da",
        bug: "#bae05f",
        rock: "#C9BB8A",
        ghost: "#8291e0",
        dark: "#8e8c94",
        dragon: "#88a2e8",
        steel: "#9fb8b9",
        fairy: "#fdb9e9",
      };
    
      //se il pokemon ha due tipi avrà due colori diversi, altrimenti avrà lo stesso
      const color1 = colors[type1];
      const color2 = (length === 2) ? colors[type2] : color1;
      
      const finalColor = [color1, color2];
      return finalColor;

}