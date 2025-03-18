// plant growth control system

const pi = 3.1415;

// constants
const garden_radius = 5;
const garden_area = pi * garden_radius * garden_radius;
const min_space_per_plant = 0.8;  
const max_plants = Math.floor(garden_area / min_space_per_plant);

// growth control system
function growth_control(initial_plants, weeks) {
  let plant_count = initial_plants * Math.pow(2, weeks);
  const capacity = (plant_count / max_plants) * 100;

  if (capacity > 80) {
    return `prune: the garden is overcrowded. (${plant_count} plants, ${capacity.toFixed(2)}% of capacity)`;
  } else if (capacity >= 50 && capacity <= 80) {
    return `monitor: the garden is growing at an acceptable rate. (${plant_count} plants, ${capacity.toFixed(2)}% of capacity)`;
  } else {
    return `plant: there is room for more plants. (${plant_count} plants, ${capacity.toFixed(2)}% of capacity)`;
  }
}

// test for weeks 1, 2, and 3
console.log(growth_control(20, 1));
console.log(growth_control(20, 2));
console.log(growth_control(20, 3));

// part 2: additional space calculation
function calculate_additional_space(initial_plants, weeks) {
  let plant_count = initial_plants * Math.pow(2, weeks);
  const required_area = plant_count * min_space_per_plant;
  const additional_area = required_area - garden_area;
  const new_radius = Math.sqrt(required_area / pi);

  return {
    additional_area: additional_area.toFixed(2),
    new_radius: new_radius.toFixed(2)
  };
}

// test for part 2
console.log(calculate_additional_space(100, 10));

// part 3: error handling
function monitor_garden(initial_plants, weeks) {
  try {
    let plant_count = initial_plants * Math.pow(2, weeks);
    const required_area = plant_count * min_space_per_plant;

    if (required_area > garden_area) {
      throw new Error(`overcrowded! required area (${required_area.toFixed(2)} m²) exceeds available area (${garden_area.toFixed(2)} m²).`);
    }
    return `garden is fine with ${plant_count} plants.`;
  } catch (error) {
    console.error(error.message);
  }
}

// test for part 3
console.log(monitor_garden(100, 10));
