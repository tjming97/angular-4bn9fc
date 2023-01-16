import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-skill-tooltip',
  templateUrl: './skill-tooltip.component.html',
  styleUrls: ['./skill-tooltip.component.css']
})
export class SkillTooltipComponent implements OnInit {
  data: any;
  styleLeft: any;
  styleTop: any;
  constructor(
  ) { }

  ngOnInit() {
  }

}
