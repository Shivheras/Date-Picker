import { Component ,OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Calander';
  MonthNames:any;
  Dayname:any;
  Month:any;
  Days:any;
  year:any;
  current:any; 
  currentyear:any;
  currentmonth:any;
  Years:any=[];
  id:any;
  Date:any;
  constructor(){}
  
ngOnInit()
{
            this.MonthNames = [ "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December" ];
            this.Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
            this.getyears()
            this.current = new Date();
            var lable = document.getElementById("current");
            lable.innerHTML=this.current.getDate()+" "+this.MonthNames[this.current.getMonth()]+" "+this.current.getFullYear();
            this.getDayNames(this.current.getFullYear(),this.current.getMonth());
            var year= document.getElementById("dropyear") as HTMLSelectElement;
           year.options[year.selectedIndex].text=this.current.getFullYear();
           var month= document.getElementById("month") as HTMLSelectElement;
           month.options[month.selectedIndex].text=this.MonthNames[this.current.getMonth()];
            console.log(this.current.getMonth())
            this.year=this.current.getFullYear();
            this.Date=this.current.getDate();
            this.Month=this.current.getMonth()
            this.click();

          }
         
         
daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}
prev()
{
  this.current=new Date(this.current.getFullYear(),this.current.getMonth()-1);
console.log("fsfsf"+ this.current.getMonth()+" "+this.MonthNames[this.current.getMonth()])
  
this.getDayNames(this.current.getFullYear(),this.current.getMonth());
  var month=this.MonthNames[this.current.getMonth()];
  console.log("month",month)
  var lable = document.getElementById("current");
  lable.innerHTML=this.Date+" "+month+" "+this.current.getFullYear();
  this.click();
  
}
next()
{
  this.current=new Date(this.current.getFullYear(),this.current.getMonth()+1);
console.log("fsfsf"+ this.current.getMonth()+" "+this.MonthNames[this.current.getMonth()])
this.getDayNames(this.current.getFullYear(),this.current.getMonth());
  var month=this.MonthNames[this.current.getMonth()];
  console.log("next month",month)
  var lable = document.getElementById("current");
  lable.innerHTML=this.Date+" "+month+" "+this.current.getFullYear();
  this.click();
  
}
send(event: any) {
  
  this.Month= event.target.selectedIndex -1 ;

 this.current=new Date(this.year,this.Month,0);
 var lable = document.getElementById("current");
  lable.innerHTML=this.Date+" "+this.MonthNames[this.Month]+" "+this.current.getFullYear();
  this.daysInMonth(this.Month,this.year);
  this.getDayNames(this.year,this.Month);
  this.click();
  console.log(this.Month);
}

getyears()
{
  
  var current = new Date();
  var currentYear = current.getFullYear();
for (let i = 50; i >= 0; i--)
{    
    
    this.Years.push(currentYear-i)
   
}
console.log(this.Years);
}
select(event: any) {
  this.year= event.target.value;
  var lable = document.getElementById("current");
  lable.innerHTML=this.Date+" "+this.MonthNames[this.Month]+" "+this.year;
  this.getDayNames(this.year,this.current.getMonth());
  console.log("dvgfsdf",this.current.getMonth());
  this.click();
}

getDay(date) { // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day == 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}

click(){
  var table = document.getElementById("table") as HTMLTableElement;
  
  var td = table.getElementsByTagName("td");

      for(var i=0;i<td.length;i++){
       
       

          td[i].addEventListener('click', (e)=> {

          console.log(e.target)
          var str =e.target as HTMLElement;
          // console.log("id",str)
          console.log(str.innerHTML);
          this.Date=str.innerHTML;
          // str.setAttribute("style", "color:black;");
          str.setAttribute("style",  ":hover {background: yellow}");
          var lable = document.getElementById("current");
          lable.innerHTML=this.Date+" "+this.MonthNames[this.Month]+" "+this.current.getFullYear();
          
         
           });
           
           

           
      }
      
      
}

getDayNames(year: number, month: number) {
  
  

           let mon = month; // months in JS are 0..11, not 1..12
           let d = new Date(year, mon);
           console.log(month)

          let table = '<tr><th>MO</th><th >TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';
          var elem = document.getElementById("table");

          // spaces for the first row
          // from Monday till the first day of the month
          // * * * 1  2  3  4
          for (let i = 0; i < this.getDay(d); i++) {
            table += '<td></td>';
          }

          // <td> with actual dates
          while (d.getMonth() == mon) {
            table += '<td id="a">' + d.getDate() + '</td>';
            
            

            if (this.getDay(d) % 7 == 6) { // sunday, last day of week - newline
              table += '</tr><tr>';
            }

            d.setDate(d.getDate() + 1);
          }

          // add spaces after last days of month for the last row
          // 29 30 31 * * * *
          if (this.getDay(d) != 0) {
            for (let i = this.getDay(d); i < 7; i++) {
              table += '<td></td>';
            }
          }

          // close the table
          table += '</tr>';

          elem.innerHTML = table;
 
}
}