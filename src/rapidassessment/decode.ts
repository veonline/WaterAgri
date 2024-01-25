


function decode() {

  let a = [
    {
      "dim": "env",
      "WATERAGRI Sites": "FI1",
      "suitability": 10,
      "solutions": "Precision irrigation\nDrainage systems"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "FI2",
      "suitability": 10,
      "solutions": "Precision irrigation\nDrainage systems"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "SE",
      "suitability": 10,
      "solutions": "Farm Constructed Wetlands\nPrecision Irrigation System\nBiochar\nDrainage systems"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "FR",
      "suitability": 10,
      "solutions": "Farm Constructed Wetlands\nPrecision Irrigation System\nBiochar\nDrainage systems"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "DE",
      "suitability": 10,
      "solutions": "Farm Constructed Wetlands\nPrecision Irrigation System\nBiochar\nDrainage systems"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "PL",
      "suitability": 10,
      "solutions": "Farm Constructed Wetlands\nPrecision Irrigation System\nBiochar\nDrainage systems"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "CH",
      "suitability": 10,
      "solutions": "Farm Constructed Wetlands\nPrecision Irrigation System\nBiochar\nDrainage systems"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "AT",
      "suitability": 10,
      "solutions": "Farm Constructed Wetlands\nPrecision Irrigation System\nBiochar\nDrainage systems"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "IT",
      "suitability": 10,
      "solutions": "Farm Constructed Wetlands\nPrecision Irrigation System\nBiochar\nDrainage systems"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "HU",
      "suitability": 10,
      "solutions": "Farm Constructed Wetlands\nPrecision Irrigation System\nBiochar\nDrainage systems"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "FI1",
      "suitability": 10,
      "solutions": "Enhanced Water Retainer"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "FI2",
      "suitability": 10,
      "solutions": "Enhanced Water Retainer"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "SE",
      "suitability": 10,
      "solutions": "Constructed Wetlands\nEnhanced Water Retainer\nPrecision Irrigation"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "FR",
      "suitability": 10,
      "solutions": "Constructed Wetlands\nEnhanced Water Retainer\nPrecision Irrigation"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "DE",
      "suitability": 10,
      "solutions": "Constructed Wetlands\nEnhanced Water Retainer\nPrecision Irrigation"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "PL",
      "suitability": 10,
      "solutions": "Constructed Wetlands\nDrainage Systems\nEnhanced Water Retainer\nPrecision Irrigation\nBiochar"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "CH",
      "suitability": 10,
      "solutions": "Constructed Wetlands\nEnhanced Water Retainer\nPrecision Irrigation"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "AT",
      "suitability": 10,
      "solutions": "Enhanced Water Retainer"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "IT",
      "suitability": 10,
      "solutions": "Constructed Wetlands\nEnhanced Water Retainer\nPrecision Irrigation"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "HU",
      "suitability": 10,
      "solutions": "Constructed Wetlands\nDrainage Systems\nEnhanced Water Retainer\nPrecision Irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "FI1",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "FI2",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "SE",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "FR",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "DE",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "PL",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "CH",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "AT",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "IT",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "HU",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nDrainage Systems\nPrecision irrigation\nBiochar"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "FI1",
      "suitability": 10,
      "solutions": "-"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "FI2",
      "suitability": 10,
      "solutions": "-"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "SE",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nPrecision irrigation system"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "FR",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nPrecision irrigation system"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "DE",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nPrecision irrigation system"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "PL",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nPrecision irrigation system\nBiochar\nDrainage System"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "CH",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nPrecision irrigation system"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "AT",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nPrecision irrigation system"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "IT",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nPrecision irrigation system"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "HU",
      "suitability": 10,
      "solutions": "Farm constructed wetlands\nPrecision irrigation system\nBiochar\nDrainage System"
    },
    {
      "dim": "",
      "WATERAGRI Sites": "",
      "suitability": 0,
      "solutions": ""
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "FI1",
      "suitability": 5,
      "solutions": "Farm constructed wetlands (boreal climate); \nBiochar (boreal climate)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "FI2",
      "suitability": 5,
      "solutions": "Farm constructed wetlands (boreal climate); \nBiochar (boreal climate)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "SE",
      "suitability": 5,
      "solutions": ""
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "FR",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (cereal crop but other crops OK)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "DE",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (cereal crop but other crops OK)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "PL",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (cereal crop but other crops OK)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "CH",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (cereal crop but other crops OK)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "AT",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (cereal crop but other crops OK)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "IT",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (cereal crop but other crops OK)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "HU",
      "suitability": 5,
      "solutions": ""
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "FI1",
      "suitability": 5,
      "solutions": "Farm constructed wetlands (costs)\nBiochar (problem: high labor, energy and material costs)\nDrainage systems (high labor, energy and material costs)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "FI2",
      "suitability": 5,
      "solutions": "Farm constructed wetlands (costs)\nBiochar (problem: high labor, energy and material costs)\nDrainage systems (high labor, energy and material costs)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "SE",
      "suitability": 5,
      "solutions": "Biochar (problem: high labor, energy and material costs)\nDrainage systems (high labor, energy and material costs)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "FR",
      "suitability": 5,
      "solutions": "Biochar (problem: high labor, energy and material costs)\nDrainage systems (high labor, energy and material costs)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "DE",
      "suitability": 5,
      "solutions": "Biochar (problem: high labor, energy and material costs)\nDrainage systems (high labor, energy and material costs)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "PL",
      "suitability": 5,
      "solutions": ""
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "CH",
      "suitability": 5,
      "solutions": "Biochar (problem: high labor, energy and material costs)\nDrainage systems (high labor, energy and material costs)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "AT",
      "suitability": 5,
      "solutions": "Biochar (problem: high labor, energy and material costs)\nDrainage systems (high labor, energy and material costs)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "IT",
      "suitability": 5,
      "solutions": "Biochar (problem: high labor, energy and material costs)\nDrainage systems (high labor, energy and material costs)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "HU",
      "suitability": 5,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "FI1",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "FI2",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "SE",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "FR",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "DE",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "PL",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "CH",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "AT",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "IT",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "HU",
      "suitability": 5,
      "solutions": "Water retainer (level of acceptance is low)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "FI1",
      "suitability": 5,
      "solutions": "Farm constructed wetlands (climate, costs)\nBiochar (climate, costs)\nDrainage system (costs)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "FI2",
      "suitability": 5,
      "solutions": "Farm constructed wetlands (climate, costs)\nBiochar (climate, costs)\nDrainage system (costs)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "SE",
      "suitability": 5,
      "solutions": "Biochar (costs)\nDrainage system (costs)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "FR",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (type of crop used, acceptance)\nBiochar (costs)\nDrainage (costs)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "DE",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (type of crop used, acceptance)\nBiochar (costs)\nDrainage (costs)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "PL",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (type of crop used, acceptance)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "CH",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (type of crop used, acceptance)\nBiochar (costs)\nDrainage (costs)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "AT",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (type of crop used, acceptance)\nBiochar (costs)\nDrainage (costs)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "IT",
      "suitability": 5,
      "solutions": "Enhanced Water Retainer (type of crop used, acceptance)\nBiochar (costs)\nDrainage (costs)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "HU",
      "suitability": 5,
      "solutions": "-"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "FI1",
      "suitability": 1,
      "solutions": "Enhanced Water Retainer (root crop)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "FI2",
      "suitability": 1,
      "solutions": "Enhanced Water Retainer (grass)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "SE",
      "suitability": 1,
      "solutions": "Enhanced Water Retainer (cereal crop)"
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "FR",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "DE",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "PL",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "CH",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "AT",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "IT",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "env",
      "WATERAGRI Sites": "HU",
      "suitability": 1,
      "solutions": "Enhanced Water Retainer (cereal crop)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "FI1",
      "suitability": 1,
      "solutions": "Precision Irrigation (farm size)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "FI2",
      "suitability": 1,
      "solutions": "Precision Irrigation (farm size)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "SE",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "FR",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "DE",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "PL",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "CH",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "AT",
      "suitability": 1,
      "solutions": "Constructed Wetlands (farm size; cost of labor)\nPrecision Irrigation (farm size)"
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "IT",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "eco",
      "WATERAGRI Sites": "HU",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "FI1",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "FI2",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "SE",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "FR",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "DE",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "PL",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "CH",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "AT",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "IT",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "soc",
      "WATERAGRI Sites": "HU",
      "suitability": 1,
      "solutions": ""
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "FI1",
      "suitability": 1,
      "solutions": "Enhanced Water Retainer (root crop; low acceptance)\nPrecision irrigation system (farm size)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "FI2",
      "suitability": 1,
      "solutions": "Enhanced Water Retainer (grass; low acceptance)\nPrecision irrigation system (farm size)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "SE",
      "suitability": 1,
      "solutions": "Enhanced Water Retainer (cereal crop)"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "FR",
      "suitability": 1,
      "solutions": "-"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "DE",
      "suitability": 1,
      "solutions": "-"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "PL",
      "suitability": 1,
      "solutions": "-"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "CH",
      "suitability": 1,
      "solutions": "-"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "AT",
      "suitability": 1,
      "solutions": "-"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "IT",
      "suitability": 1,
      "solutions": "-"
    },
    {
      "dim": "gen",
      "WATERAGRI Sites": "HU",
      "suitability": 1,
      "solutions": "Enhanced Water Retainer (cereal crop)"
    }
  ];


  // let a=[];

  let new_array: AssessmentItem[] = [];

  a.forEach((item) => {
    let solutions = item.solutions.split("\n");

    for (let i = 0; i < solutions.length; i++) {
      let obj: AssessmentItem = { dim: "", solutions: "", suitability: 0, WATERAGRI_Sites: "", reason: "" };
      obj.dim = item.dim;
      obj.WATERAGRI_Sites = item["WATERAGRI Sites"];
      obj.suitability = item.suitability;
      obj.solutions = solutions[i];
      new_array.push(obj);
    }
  });

  console.log(JSON.stringify(new_array));

}


decode();

