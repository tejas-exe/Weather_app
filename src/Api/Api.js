export class fechApi {
  static async fechWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3b943507e9176bc94c888e5a56a3436&units=metric`
      );
      const jsonData = await response.json();

      return jsonData;
    } catch (error) {
    alert(error)
    }
  }
}
