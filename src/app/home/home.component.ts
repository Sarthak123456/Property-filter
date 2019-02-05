import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import {map, startWith} from 'rxjs/operators';
import { Options, LabelType } from 'ng5-slider';
import { DataService } from '../data.service';



@NgModule({
  imports: [
    MatFormField
   ],
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  min_budget: number;
  max_budget: number;
  min_bedroom: number;
  max_bedroom: number;
  min_bathroom: number;
  max_bathroom: number;
  filteredData = [];
  response: any;
  result: any;
  results: any;
  cityName = {'city' : '', 'distance' : ''};
  lat: number;
  lon: number;
    myControl = new FormControl();
    options: string[] = ['Mumbai', 'Delhi', 'Bengaluru', 'Ahmedabad', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune',
    'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Patna', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
    'Vadodara', 'Firozabad', 'Ludhiana', 'Rajkot', 'Agra', 'Siliguri', 'Nashik', 'Faridabad', 'Patiala', 'Meerut',
    'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi', 'Srinagar', 'Dhanbad', 'Jodhpur', 'Amritsar', 'Raipur', 'Allahabad',
     'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Madurai', 'Guwahati', 'Chandigarh', 'Hubli-Dharwad', 'Amroha',
     'Moradabad', 'Gurgaon', 'Aligarh', 'Solapur', 'Ranchi', 'Jalandhar', 'Tiruchirappalli', 'Bhubaneswar', 'Salem',
     'Warangal', 'Mira-Bhayandar', 'Thiruvananthapuram', 'Bhiwandi', 'Saharanpur', 'Guntur', 'Amravati', 'Bikaner',
     'Noida', 'Jamshedpur', 'Bhilai', 'Nagar', 'Cuttack', 'Kochi', 'Udaipur', 'Bhavnagar', 'Dehradun', 'Asansol',
     'Nanded-Waghala', 'Ajmer', 'Jamnagar', 'Ujjain', 'Sangli', 'Loni', 'Jhansi', 'Pondicherry', 'Nellore', 'Jammu',
     'Belagavi', 'Raurkela', 'Mangaluru', 'Tirunelveli', 'Malegaon', 'Gaya', 'Tiruppur', 'Davanagere', 'Kozhikode',
     'Akola', 'Kurnool', 'Bokaro', 'Steel', 'City', 'Rajahmundry', 'Ballari', 'Agartala', 'Bhagalpur', 'Latur',
      'Dhule', 'Korba', 'Bhilwara', 'Brahmapur', 'Mysore', 'Muzaffarpur', 'Ahmednagar', 'Kollam', 'Raghunathganj',
      'Bilaspur', 'Shahjahanpur', 'Thrissur', 'Alwar', 'Kakinada', 'Nizamabad', 'Sagar', 'Tumkur', 'Hisar',
     'Rohtak', 'Panipat', 'Darbhanga', 'Kharagpur', 'Aizawl', 'Ichalkaranji', 'Tirupati', 'Karnal', 'Bathinda',
     'Rampur', 'Shivamogga', 'Ratlam', 'Modinagar', 'Durg', 'Shillong', 'Imphal', 'Hapur', 'Ranipet',
     'Anantapur', 'Arrah', 'Karimnagar', 'Parbhani', 'Etawah', 'Bharatpur', 'Begusarai', 'New', 'Delhi',
      'Chhapra', 'Kadapa', 'Ramagundam', 'Pali', 'Satna', 'Vizianagaram', 'Katihar', 'Hardwar', 'Sonipat',
     'Nagercoil', 'Thanjavur', 'Murwara', '(Katni)', 'Naihati', 'Sambhal', 'Nadiad', 'Yamunanagar', 'English',
     'Bazar', 'Eluru', 'Munger', 'Panchkula', 'Raayachuru', 'Panvel', 'Deoghar', 'Ongole', 'Nandyal', 'Morena',
     'Bhiwani', 'Porbandar', 'Palakkad', 'Anand', 'Purnia', 'Baharampur', 'Barmer', 'Morvi', 'Orai', 'Bahraich',
     'Sikar', 'Vellore', 'Singrauli', 'Khammam', 'Mahesana', 'Silchar', 'Sambalpur', 'Rewa', 'Unnao', 'Hugli-Chinsurah',
     'Raiganj', 'Phusro', 'Adityapur', 'Alappuzha', 'Bahadurgarh', 'Machilipatnam', 'Rae', 'Bareli', 'Jalpaiguri',
     'Bharuch', 'Pathankot', 'Hoshiarpur', 'Baramula', 'Adoni', 'Jind', 'Tonk', 'Tenali', 'Kancheepuram', 'Vapi', 'Sirsa',
     'Navsari', 'Mahbubnagar', 'Puri', 'Robertson', 'Pet', 'Erode', 'Batala', 'Haldwani-cum-Kathgodam', 'Vidisha',
     'Saharsa', 'Thanesar', 'Chittoor', 'Veraval'];
    filteredOptions: Observable<string[]>;

    minBudget = 100;
    maxBudget = 400;
    Budget: Options = {
      floor: 0,
      ceil: 500,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            this.min_budget = value;
            return '<b>Min price:</b> $' + value;
          case LabelType.High:
          this.max_budget = value;

            return '<b>Max price:</b> $' + value;
          default:
            return '$' + value;
        }
      }
    };

    minBedroom = 1;
    maxBedroom = 4;
    Bedroom: Options = {
      floor: 0,
      ceil: 20,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            this.min_bedroom = value;
            return '<b>Min Bedroom:</b> ' + value;
          case LabelType.High:
          this.max_bedroom = value;

            return '<b>Max Bedroom:</b> ' + value;
          default:
            return '' + value;
        }
      }
    };


    minBathroom = 2;
    maxBathroom = 6;
    Bathroom: Options = {
      floor: 0,
      ceil: 20,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            this.min_bathroom = value;
            return '<b>Min Bathroom:</b> ' + value;
          case LabelType.High:
          this.max_bathroom = value;

            return '<b>Max Bathroom:</b> ' + value;
          default:
            return '' + value;
        }
      }
    };

    constructor(private data: DataService) {}

    ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.options.filter(option => option.toLowerCase().includes(filterValue));
        // this.city = option;);
    }

    onSave() {
  // console.log(this.cityName.city);
  this.data.getCoordinates(this. cityName.city)
  .subscribe(res => {
    this.response = res;
    this.lat = this.response.results[0].geometry.location.lat;
    this.lon = this.response.results[0].geometry.location.lng;
    this.result = JSON.stringify(`city_name : ${this. cityName.city} , distance_from_user :${this.cityName.distance} ,lat : ${this.lat} , lon : ${this.lon}, min_budget : ${this.min_budget}, max_budget : ${this.max_budget}, min_bedroom : ${this.min_bedroom}, max_bedroom : ${this.max_bedroom} ,min_bathroom : ${this.min_bathroom}, max_bathroom : ${this.max_bathroom}`);

       console.log(this.result);

       this.data.getFilteredData(this.result)
       .subscribe( resp => {
        //  console.log('getFilteredData ' + resp.results[0].price);
         this.results = resp;
         this.filteredData = this.results.results;

        });


  });
}
    formatLabel(value: number | null) {
      if (!value) {
        return 0;
      }

      if (value >= 1) {
        return Math.round(value / 1) + 'km';
      }

      return value;
    }
  }
