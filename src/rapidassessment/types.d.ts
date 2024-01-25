type AssessmentDimensions = "gen" | "env" | "soc" | "eco"

type AssessmentItem = {
  dim: AssessmentDimensions,
  WATERAGRI_Sites: string,
  suitability: number,
  solution: string,
  reason: string
}

type AssessmentLocation = {
  name: string,
  code: string,
  lat: number,
  lng: number,
  zone: "Continental" | "Boreal" | "Pannonian",
  url: string
}

type Solution = {
  solution: string,
} & Record<AssessmentDimensions, AssessmentItem>