import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeocodingService {
  private readonly apiKey: string;
  private readonly baseUrlAddress: string =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  private readonly baseUrlDriving: string =
    'https://api.mapbox.com/directions/v5/mapbox/driving/';

  constructor() {
    this.apiKey = process.env.MAPBOX_API_KEY;
  }

  async geocodeAddress(address: string) {
    const url = `${this.baseUrlAddress}${address}.json?access_token=${this.apiKey}`;
    const data = await axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          throw new HttpException(error.response.data, error.response.status);
        }
        throw new HttpException(error.message, 500);
      });
    return data.features[0].geometry.coordinates;
  }

  //   10.732854766636226,
  //   106.69966286443857,
  //   10.753235505634327,
  //   106.72753316443965,
  // );

  async getTravelTime(
    originLat: number,
    originLng: number,
    destinationLat: number,
    destinationLng: number,
  ) {
    const url = `${this.baseUrlDriving}${originLng},${originLat};${destinationLng},${destinationLat}?access_token=${this.apiKey}`;
    const data = await axios
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          throw new HttpException(error.response.data, error.response.status);
        }
        throw new HttpException(error.message, 500);
      });

    const durationInMinutes = data.routes[0].duration / 60;
    const distanceInKilometers = data.routes[0].distance / 1000;

    return { durationInMinutes, distanceInKilometers };
  }
}
