import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private tarjetaService: TarjetaService,
              private toastr: ToastrService) {
    this.formulario=this.formBuilder.group({
      id:0,
      titular: ['',[Validators.required]],
      numeroTarjeta: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })
   }

  ngOnInit(): void {
  }

  guardarTarjeta(){
   const tarjeta: TarjetaCredito={
     titular: this.formulario.get('titular').value,
     numeroTarjeta: this.formulario.get('numeroTarjeta').value,
     fechaExpiracion: this.formulario.get('fechaExpiracion').value,
     cvv: this.formulario.get('cvv').value,
   }


    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data =>{
      this.toastr.success('Registro Agregado','La tarjeta fue agregada');
      this.formulario.reset();
    });
  }

}
