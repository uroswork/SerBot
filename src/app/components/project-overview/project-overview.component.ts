import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  updateSvg: boolean = false;
  offset: number;
  activeProject: number = 0;
  startNumber: number = 0;
  isSwitchingBetweenProjects: boolean = false;
  projects: Array<any> = [ // IT SHOULDN'T BE ANY - CREATE MODEL
    {
      name: 'Google',
      type: 'Information Technology',
      description: 'Google is a United States - headquartered, multinational corporation specializing in internet-related services and products.',
      chartPercentage: '85%',
      chartText: 'Positive reviews',
      numbersInfo: [
        {
          title: 'Overall rating',
          image: 'chart',
          rating: '9.2 / 10',
        },
        {
          title: 'Based on',
          image: 'chat',
          number: '13 500',
          text: 'reviews',
        }
      ],
      categoriesRatings: [
        {
          title: 'Numbers of gossip',
          rating: '4.3',
          isCompleted: true,
        },
        {
          title: 'Sexual harassment',
          rating: '2.5',
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
        {
          title: 'Good for students',
          rating: '8.9',
          isCompleted: true,
        },
        {
          title: 'Product discount',
          rating: '7.4',
        },
        {
          title: 'Cheap travel',
          rating: '6.7',
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
      ]
    },
    {
      name: 'GoogleNeg',
      type: 'Information Technology',
      description: 'Google is a United States - headquartered, multinational corporation specializing in internet-related services and products.',
      chartPercentage: '24%',
      chartText: 'Negative reviews',
      numbersInfo: [
        {
          title: 'Overall rating',
          image: 'chart',
          rating: '3.2 / 10',
        },
        {
          title: 'Based on',
          image: 'chat',
          number: '400',
          text: 'reviews',
        }
      ],
      categoriesRatings: [
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
      ]
    },
    {
      name: 'GoogleMedium',
      type: 'Information Technology',
      description: 'Google is a United States - headquartered, multinational corporation specializing in internet-related services and products.',
      chartPercentage: '40%',
      chartText: 'Positive reviews',
      numbersInfo: [
        {
          title: 'Overall rating',
          image: 'chart',
          rating: '9.2 / 10',
        },
        {
          title: 'Based on',
          image: 'chat',
          number: '13 500',
          text: 'reviews',
        }
      ],
      categoriesRatings: [
        {
          title: 'Numbers of gossip',
          rating: '4.3',
          isCompleted: true,
        },
        {
          title: 'Sexual harassment',
          rating: '2.5',
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
        {
          title: 'Good for students',
          rating: '8.9',
          isCompleted: true,
        },
        {
          title: 'Product discount',
          rating: '7.4',
        },
        {
          title: 'Cheap travel',
          rating: '6.7',
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
        {
          title: 'Good for begginers',
          rating: '8.2',
          isCompleted: true,
        },
      ]
    },
  ]

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.changeSvg();
      this.countToNumber(this.getNumberOfPercentageString(this.projects[this.activeProject].chartPercentage));
    }, 300);
  }

  handleProjectChange(sign) {
    this.updateSvg = false;
    this.isSwitchingBetweenProjects = true;
    setTimeout(() => {
      this.isSwitchingBetweenProjects = false;
      if (sign === 'plus') {
        this.activeProject = this.activeProject + 1;
      } else {
        this.activeProject = this.activeProject - 1;
      }
      this.changeSvg();
      this.countToNumber(this.getNumberOfPercentageString(this.projects[this.activeProject].chartPercentage));
    }, 1000);
  }

  changeSvg() {
    let radius = 128;
    if (window.innerWidth >= 768) {
      radius = 148;
    }
    const circumference = radius * 2 * Math.PI;
    const number = this.getNumberOfPercentageString(this.projects[this.activeProject].chartPercentage);
    this.offset = circumference - number / 100 * circumference;
    this.updateSvg = true;
  }

  getNumberOfPercentageString(string) {
    const number = string.match(/\d+/)[0];
    return number;
  }

  splitRating(string) {
    const dashIndex = string.indexOf('/');
    const rating = {
      the: string.substring(0, dashIndex),
      of: string.substring(dashIndex, string.length)
    }
    return rating;
  }

  countToNumber(number) {
    this.startNumber = 0;
    const time = 1000 / number;
    const interval = setInterval(() => {
      this.startNumber += 1;
      if (number == this.startNumber) {
        clearInterval(interval);
      }
    }, time);
  }
}