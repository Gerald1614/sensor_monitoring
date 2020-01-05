
export const transformedData = (data) => {
  const elevation = 63
  const tempGradient = 0.0065
  let { temperature_C, humidity, pressure_hPa } = data
  const seaLevelHPa = pressure_hPa * Math.pow((1.0 - (tempGradient * elevation) / (temperature_C + tempGradient * elevation + 273.15)), -5.257)
  return { temperature_C, humidity, seaLevelHPa }
}
