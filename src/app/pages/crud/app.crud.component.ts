import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { ConfirmationService, MessageService } from "primeng/api";
import { CrudService } from "src/app/services/crud/crud.service";
import { StorageService } from '../../services/storage/storage.service';

@Component({
  templateUrl: "./app.crud.component.html",
  styleUrls: ["../../layouts/view/tabledemo.scss"],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }

      @media screen and (max-width: 960px) {
        :host
          ::ng-deep
          .p-datatable.p-datatable-customers
          .p-datatable-tbody
          > tr
          > td:last-child {
          text-align: center;
        }

        :host
          ::ng-deep
          .p-datatable.p-datatable-customers
          .p-datatable-tbody
          > tr
          > td:nth-child(6) {
          display: flex;
        }
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AppCrudComponent implements OnInit {
  productDialog: boolean;
  products: Product[] = this.storageSrv.getProducts();
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  cols: any[];
  public articles$ = this.crudService.articles$;  

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private crudService: CrudService,
    private storageSrv: StorageService
  ) {
    this.articles$.subscribe(data => {
      this.products = data
      console.log(this.products);
    })
  }

  ngOnInit() {

    this.crudService.getArticles().subscribe((data:any) => {
      this.products = data.data
      console.log(this.products);
    })

    this.cols = [
      { field: "Nombre", header: "Nombre" },
      { field: "Descripcion", header: "Descripcion" },
      { field: "Precio", header: "Precio" },
      { field: "Cantidad", header: "Cantidad" },
      { field: "Fecha", header: "Fecha" },
    ];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: "Esta seguro de querer eliminar " + product.description + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.crudService.deleteArticle(product.id).subscribe((resp:any) => {
          const { res, msg } = resp;
          if (res) {
            this.products = this.products.filter((val) => val.id !== product.id);
            this.crudService.articles$.next(this.products);
            this.storageSrv.setProducts(this.products);
            this.product = {};
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: `${msg}`,
              life: 3000,
            });
          }
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        const data = {
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          quantity: this.product.quantity,
          image: this.product.image,
        }
        this.crudService.editArticles(this.product.id, data).subscribe((resp:any) => {
          const { res, msg } = resp;
          this.storageSrv.setProducts(this.products);
          if (res) {
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: `${msg}`,
              life: 3000,
            });
          } 
        })
      } else {
        this.product.image = "product-placeholder.svg";
        this.crudService.createArticles(this.product).subscribe((resp: any) => { 
          const { res, msg, data } = resp;
          if (res) {
            this.products.push(data); 
            this.storageSrv.setProducts(this.products);
            this.crudService.articles$.next(this.products);
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: `${msg}`,
              life: 3000,
            });
          }
        });

      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

}
