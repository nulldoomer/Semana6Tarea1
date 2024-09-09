import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { IIva } from 'src/app/Interfaces/iva.interface';
import { IvaService } from 'src/app/Services/iva.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent implements OnInit {
  listaUnidadMedida: IUnidadMedida[] = [];
  listaProveedores: Iproveedor[] = [];
  listaIva: IIva[] = [];
  idProducto = 0;
  titulo = '';
  frm_Producto: FormGroup;
  constructor(
    private productoService: ProductoService,
    private uniadaServicio: UnidadmedidaService,
    private ivaService : IvaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private ruta: ActivatedRoute,
    private navegacion: Router
  ) { }
  ngOnInit(): void {
    this.idProducto = parseInt(this.ruta.snapshot.paramMap.get("id"));
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaService.todos().subscribe((data) => this.listaIva = data); 

    this.crearFormulario();
    

    /*
1.- Modelo => Solo el procedieminto para realizar un select
2.- Controador => Solo el procedieminto para realizar un select
3.- Servicio => Solo el procedieminto para realizar un select
4.-  realizar el insertar y actualizar

*/

  }

  crearFormulario() {
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)


      /* this.frm_Producto = this.fb.group({
        Codigo_Barras: ['', Validators.required],
        Nombre_Producto: ['', Validators.required],
        Graba_IVA: ['', Validators.required],
        Unidad_Medida_idUnidad_Medida: ['', Validators.required],
        IVA_idIVA: ['', Validators.required],
        Cantidad: ['', [Validators.required, Validators.min(1)]],
        Valor_Compra: ['', [Validators.required, Validators.min(0)]],
        Valor_Venta: ['', [Validators.required, Validators.min(0)]],
        Proveedores_idProveedores: ['', Validators.required]
      });*/
    });
  }


  grabar() {
    let producto : IProducto;
    if(this.idProducto>0){
      producto ={
        idProductos : this.idProducto,
        Codigo_Barras: this.frm_Producto.get("Codigo_Barras")?.value,
        Nombre_Producto:this.frm_Producto.get("Nombre_Producto")?.value,
        Graba_IVA:this.frm_Producto.get("Graba_IVA")?.value,
        Unidad_Medida_idUnidad_Medida:this.frm_Producto.get("Unidad_Medida_idUnidad_Medida")?.value,
        IVA_idIVA:this.frm_Producto.get("IVA_idIVA")?.value,
        Cantidad:this.frm_Producto.get("Cantidad")?.value,
        Valor_Compra:this.frm_Producto.get("Valor_Compra")?.value,
        Valor_Venta:this.frm_Producto.get("Valor_Venta")?.value,
        Proveedores_idProveedores:this.frm_Producto.get("Proveedores_idProveedores")?.value,


      };
      this.productoService.actualizar(producto).subscribe((respuesta)=>{
        if(parseInt(respuesta)>0){
          alert("PRODUCTO ACTUALIZADO");
          Swal.fire('Exito', 'El producto de medida se actualizo con exito', 'success');
          this.navegacion.navigate(["/productos"]);
        }
      });
    }else{
      producto ={
        idProductos : this.idProducto,
        Codigo_Barras: this.frm_Producto.get("Codigo_Barras")?.value,
        Nombre_Producto:this.frm_Producto.get("Nombre_Producto")?.value,
        Graba_IVA:this.frm_Producto.get("Graba_IVA")?.value,
        Unidad_Medida_idUnidad_Medida:this.frm_Producto.get("Unidad_Medida_idUnidad_Medida")?.value,
        IVA_idIVA:this.frm_Producto.get("IVA_idIVA")?.value,
        Cantidad:this.frm_Producto.get("Cantidad")?.value,
        Valor_Compra:this.frm_Producto.get("Valor_Compra")?.value,
        Valor_Venta:this.frm_Producto.get("Valor_Venta")?.value,
        Proveedores_idProveedores:this.frm_Producto.get("Proveedores_idProveedores")?.value,
      };
      this.productoService.insertar(producto).subscribe((respuesta)=>{
        if(parseInt(respuesta)>0){
          alert("PRODUCTO GRABADO");
          Swal.fire('Exito', 'El producto de medida se actualizo con exito', 'success');
          this.navegacion.navigate(["/productos"]);
        }
      });
    }
  }


}
