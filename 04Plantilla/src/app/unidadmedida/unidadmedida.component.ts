import { Component, OnInit } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedida';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { UnidadmedidaService } from '../Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './unidadmedida.component.html',
  styleUrl: './unidadmedida.component.scss'
})
export class UnidadmedidaComponent implements OnInit {
  listaunidades: IUnidadMedida[] = [];

  constructor(private unidadServicio: UnidadmedidaService) {}
  ngOnInit(): void {
    this.listarUnidadesMedida();
  }
  listarUnidadesMedida(){
    this.unidadServicio.todos().subscribe((data) => {
      this.listaunidades = data;
    });
    
  }

  eliminar(idUnidad_Medida: number) {
    Swal.fire({
      title : "Unidad Medida",
      text: "Esta seguro de eliminar esta unidad medida?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonAriaLabel: "#d33",
      cancelButtonAriaLabel: "#3085d6",
      confirmButtonText: "Eliminar unidad Medida"
    }).then((result)=>
    {
      if(result.isConfirmed){
        this.unidadServicio.eliminar(idUnidad_Medida).subscribe((data)=>{
          Swal.fire("Unidad Medida","La unidad medida se ha eliminado", "success");
          this.listarUnidadesMedida();
        })
      }
    })
  }
}
