import { Location } from './location';

/**
 * Enum WeatherType
 * @description Enum for the weather type
 * Used in:
 *     useFetchWeather.tsx
 */

export enum WeatherType {
    WEATHER = 'weather',
    FORECAST = 'forecast',
    NOT_SET = 'not set'
}

/**
 * Enum Time
 * @description Enum for the time string
 * Used in:
 *      useFetchWeather.tsx
 */

export enum Time {
    TIME = '12:00:00'
}

/**
 * Interface WeatherInfo
 * @description Interface for the weather info object
 * Used in:
 *      useFetchWeather.tsx,
 *      CreateFishContext.tsx
 */

export interface WeatherInfo {
    icon: string;
    time: string;
    weather: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        wind_speed: number;
        wind_direction: number;
    };
}

/**
 * Interface WeatherObject
 * @description Interface for the weather object
 * Used in:
 *      useFetchWeather.tsx,
 *      CreateFishContext.tsx,
 *      WeatherContext.tsx,
 *      WeatherCard.tsx 
 */

export interface WeatherObject {
    type: WeatherType;
    name: string;
    id: string;
    info: string;
    coords: Location;
    forecastArray: WeatherInfo[] | [];
    currentWeather: WeatherInfo | {};

}