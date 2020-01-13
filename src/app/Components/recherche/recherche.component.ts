import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ImagesService } from 'src/app/Services/images.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  selectedImg
  result
  imgUrl:any="../assets/images/3901.png";
  constructor(private imageService: ImagesService) { }

  ngOnInit() {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      console.log("cond");
      e.returnValue = confirmationMessage;
      console.log(e.returnValue)
      // Gecko, Trident, Chrome 34+
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
  });
  }

  setimg(event){
    this.selectedImg=event.target.files[0]
    if (event.target.files.length === 0)
      return;

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The file you chose is not an image!'
      })
      return;
    }else{
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
      this.imgUrl = reader.result;
    }
    }
  }

   recherche(){
    let data = new FormData()
    data.append('file1', this.selectedImg)
    console.log("recherche")
      this.imageService.recherche(data).then((res)=>{
        console.log("hereee")
          this.result = res['body']
    });
  }

}
