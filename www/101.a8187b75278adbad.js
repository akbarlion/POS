"use strict";(self.webpackChunksakai_ng=self.webpackChunksakai_ng||[]).push([[101],{9101:(q,h,s)=>{s.r(h),s.d(h,{ProductsModule:()=>Q});var u=s(177),f=s(2365),t=s(4438),b=s(102),m=s(5779),a=s(6432),C=s(1570),j=s(563),y=s(1141),P=s(9998),k=s(1830),g=s(2242),v=s(1305),F=s(1599),R=s(9883),S=s(494),x=s(4714),p=s(4341),I=s(981);const T=()=>["name","country.name","representative.name","status"],D=()=>[10,20,30],_=()=>({width:"450px"}),M=n=>({"ng-invalid ng-dirty":n});function N(n,l){if(1&n){const e=t.RV6();t.j41(0,"div",18)(1,"button",19),t.bIt("click",function(){t.eBV(e);const o=t.XpG();return t.Njj(o.openNew())}),t.k0s(),t.j41(2,"button",20),t.bIt("click",function(){t.eBV(e);const o=t.XpG();return t.Njj(o.deleteSelectedProducts())}),t.k0s()()}if(2&n){const e=t.XpG();t.R7$(2),t.Y8G("disabled",!e.selectedProducts||!e.selectedProducts.length)}}function G(n,l){if(1&n){const e=t.RV6();t.nrm(0,"p-fileUpload",21),t.j41(1,"button",22),t.bIt("click",function(){t.eBV(e),t.XpG();const o=t.sdS(8);return t.Njj(o.exportCSV())}),t.k0s()}2&n&&t.Y8G("maxFileSize",1e6)}function B(n,l){if(1&n){const e=t.RV6();t.j41(0,"div",23)(1,"h5",24),t.EFF(2,"Manage Products"),t.k0s(),t.j41(3,"span",25),t.nrm(4,"i",26),t.j41(5,"input",27),t.bIt("input",function(o){t.eBV(e);const r=t.XpG(),d=t.sdS(8);return t.Njj(r.onGlobalFilter(d,o))}),t.k0s()()()}}function E(n,l){1&n&&(t.j41(0,"tr")(1,"th",28),t.nrm(2,"p-tableHeaderCheckbox"),t.k0s(),t.j41(3,"th",29),t.EFF(4,"Code "),t.nrm(5,"p-sortIcon",30),t.k0s(),t.j41(6,"th",31),t.EFF(7,"Name "),t.nrm(8,"p-sortIcon",32),t.k0s(),t.j41(9,"th",33),t.EFF(10,"Price "),t.nrm(11,"p-sortIcon",34),t.k0s(),t.j41(12,"th",35),t.EFF(13,"Category "),t.nrm(14,"p-sortIcon",36),t.k0s(),t.j41(15,"th",37),t.EFF(16,"Reviews "),t.nrm(17,"p-sortIcon",38),t.k0s(),t.j41(18,"th",39),t.EFF(19,"Status "),t.nrm(20,"p-sortIcon",40),t.k0s(),t.nrm(21,"th"),t.k0s())}function V(n,l){if(1&n){const e=t.RV6();t.j41(0,"tr")(1,"td"),t.nrm(2,"p-tableCheckbox",41),t.k0s(),t.j41(3,"td",42)(4,"span",43),t.EFF(5,"Code"),t.k0s(),t.EFF(6),t.k0s(),t.j41(7,"td",42)(8,"span",43),t.EFF(9,"Name"),t.k0s(),t.EFF(10),t.k0s(),t.j41(11,"td",44)(12,"span",43),t.EFF(13,"Price"),t.k0s(),t.EFF(14),t.nI1(15,"currency"),t.k0s(),t.j41(16,"td",42)(17,"span",43),t.EFF(18,"Category"),t.k0s(),t.EFF(19),t.k0s(),t.j41(20,"td",42)(21,"span",43),t.EFF(22,"Reviews"),t.k0s(),t.nrm(23,"p-rating",45),t.k0s(),t.j41(24,"td",42)(25,"span",43),t.EFF(26,"Status"),t.k0s(),t.j41(27,"span"),t.EFF(28),t.k0s()(),t.j41(29,"td")(30,"div",46)(31,"button",47),t.bIt("click",function(){const o=t.eBV(e).$implicit,r=t.XpG();return t.Njj(r.editProduct(o))}),t.k0s(),t.j41(32,"button",48),t.bIt("click",function(){const o=t.eBV(e).$implicit,r=t.XpG();return t.Njj(r.deleteProduct(o))}),t.k0s()()()()}if(2&n){const e=l.$implicit;t.R7$(2),t.Y8G("value",e),t.R7$(4),t.SpI(" ",e.code||e.id," "),t.R7$(4),t.SpI(" ",e.name," "),t.R7$(4),t.SpI(" ",t.i5U(15,11,e.price,"USD")," "),t.R7$(5),t.SpI(" ",e.category," "),t.R7$(4),t.Y8G("ngModel",e.rating)("readonly",!0)("cancel",!1),t.R7$(4),t.HbH("product-badge status-"+(e.inventoryStatus?e.inventoryStatus.toLowerCase():"")),t.R7$(),t.JRh(e.inventoryStatus)}}function X(n,l){if(1&n&&t.nrm(0,"img",76),2&n){const e=t.XpG(2);t.Y8G("src","assets/demo/images/product/"+e.product.image,t.B4B)("alt",e.product.image)}}function w(n,l){1&n&&(t.j41(0,"small",77),t.EFF(1,"Name is required."),t.k0s())}function H(n,l){if(1&n&&(t.j41(0,"span"),t.EFF(1),t.k0s()),2&n){const e=t.XpG(3);t.HbH("product-badge status-"+e.product.inventoryStatus.toString().toLowerCase()),t.R7$(),t.JRh(e.product.inventoryStatus)}}function Y(n,l){if(1&n&&t.DNE(0,H,2,3,"span",78),2&n){const e=t.XpG(2);t.Y8G("ngIf",e.product&&e.product.inventoryStatus)}}function O(n,l){if(1&n&&(t.j41(0,"span"),t.EFF(1),t.k0s()),2&n){const e=l.$implicit;t.HbH("product-badge status-"+e.value),t.R7$(),t.JRh(e.label)}}function U(n,l){if(1&n){const e=t.RV6();t.DNE(0,X,1,2,"img",49),t.j41(1,"div",50)(2,"label",51),t.EFF(3,"Name"),t.k0s(),t.j41(4,"input",52),t.mxI("ngModelChange",function(o){t.eBV(e);const r=t.XpG();return t.DH7(r.product.name,o)||(r.product.name=o),t.Njj(o)}),t.k0s(),t.DNE(5,w,2,0,"small",53),t.k0s(),t.j41(6,"div",50)(7,"label",54),t.EFF(8,"Description"),t.k0s(),t.j41(9,"textarea",55),t.mxI("ngModelChange",function(o){t.eBV(e);const r=t.XpG();return t.DH7(r.product.description,o)||(r.product.description=o),t.Njj(o)}),t.k0s()(),t.j41(10,"div",50)(11,"label",56),t.EFF(12,"Inventory Status"),t.k0s(),t.j41(13,"p-dropdown",57),t.mxI("ngModelChange",function(o){t.eBV(e);const r=t.XpG();return t.DH7(r.product.inventoryStatus,o)||(r.product.inventoryStatus=o),t.Njj(o)}),t.DNE(14,Y,1,1,"ng-template",58)(15,O,2,3,"ng-template",59),t.k0s()(),t.j41(16,"div",50)(17,"label",60),t.EFF(18,"Category"),t.k0s(),t.j41(19,"div",61)(20,"div",62)(21,"p-radioButton",63),t.mxI("ngModelChange",function(o){t.eBV(e);const r=t.XpG();return t.DH7(r.product.category,o)||(r.product.category=o),t.Njj(o)}),t.k0s(),t.j41(22,"label",64),t.EFF(23,"Accessories"),t.k0s()(),t.j41(24,"div",62)(25,"p-radioButton",65),t.mxI("ngModelChange",function(o){t.eBV(e);const r=t.XpG();return t.DH7(r.product.category,o)||(r.product.category=o),t.Njj(o)}),t.k0s(),t.j41(26,"label",66),t.EFF(27,"Clothing"),t.k0s()(),t.j41(28,"div",62)(29,"p-radioButton",67),t.mxI("ngModelChange",function(o){t.eBV(e);const r=t.XpG();return t.DH7(r.product.category,o)||(r.product.category=o),t.Njj(o)}),t.k0s(),t.j41(30,"label",68),t.EFF(31,"Electronics"),t.k0s()(),t.j41(32,"div",62)(33,"p-radioButton",69),t.mxI("ngModelChange",function(o){t.eBV(e);const r=t.XpG();return t.DH7(r.product.category,o)||(r.product.category=o),t.Njj(o)}),t.k0s(),t.j41(34,"label",70),t.EFF(35,"Fitness"),t.k0s()()()(),t.j41(36,"div",61)(37,"div",71)(38,"label",72),t.EFF(39,"Price"),t.k0s(),t.j41(40,"p-inputNumber",73),t.mxI("ngModelChange",function(o){t.eBV(e);const r=t.XpG();return t.DH7(r.product.price,o)||(r.product.price=o),t.Njj(o)}),t.k0s()(),t.j41(41,"div",71)(42,"label",74),t.EFF(43,"Quantity"),t.k0s(),t.j41(44,"p-inputNumber",75),t.mxI("ngModelChange",function(o){t.eBV(e);const r=t.XpG();return t.DH7(r.product.quantity,o)||(r.product.quantity=o),t.Njj(o)}),t.k0s()()()}if(2&n){const e=t.XpG();t.Y8G("ngIf",e.product.image),t.R7$(4),t.R50("ngModel",e.product.name),t.Y8G("ngClass",t.eq3(13,M,e.submitted&&!e.product.name)),t.R7$(),t.Y8G("ngIf",e.submitted&&!e.product.name),t.R7$(4),t.R50("ngModel",e.product.description),t.R7$(4),t.R50("ngModel",e.product.inventoryStatus),t.Y8G("options",e.statuses),t.R7$(8),t.R50("ngModel",e.product.category),t.R7$(4),t.R50("ngModel",e.product.category),t.R7$(4),t.R50("ngModel",e.product.category),t.R7$(4),t.R50("ngModel",e.product.category),t.R7$(7),t.R50("ngModel",e.product.price),t.R7$(4),t.R50("ngModel",e.product.quantity)}}function A(n,l){if(1&n){const e=t.RV6();t.j41(0,"button",79),t.bIt("click",function(){t.eBV(e);const o=t.XpG();return t.Njj(o.hideDialog())}),t.k0s(),t.j41(1,"button",80),t.bIt("click",function(){t.eBV(e);const o=t.XpG();return t.Njj(o.saveProduct())}),t.k0s()}}function J(n,l){if(1&n&&(t.j41(0,"span"),t.EFF(1,"Are you sure you want to delete "),t.j41(2,"b"),t.EFF(3),t.k0s(),t.EFF(4,"?"),t.k0s()),2&n){const e=t.XpG();t.R7$(3),t.JRh(e.product.name)}}function $(n,l){if(1&n){const e=t.RV6();t.j41(0,"button",81),t.bIt("click",function(){t.eBV(e);const o=t.XpG();return t.Njj(o.deleteProductDialog=!1)}),t.k0s(),t.j41(1,"button",82),t.bIt("click",function(){t.eBV(e);const o=t.XpG();return t.Njj(o.confirmDelete())}),t.k0s()}}function K(n,l){if(1&n){const e=t.RV6();t.j41(0,"button",81),t.bIt("click",function(){t.eBV(e);const o=t.XpG();return t.Njj(o.deleteProductsDialog=!1)}),t.k0s(),t.j41(1,"button",82),t.bIt("click",function(){t.eBV(e);const o=t.XpG();return t.Njj(o.confirmDeleteSelected())}),t.k0s()}}let L=(()=>{class n{constructor(e,i){this.productService=e,this.messageService=i,this.productDialog=!1,this.deleteProductDialog=!1,this.deleteProductsDialog=!1,this.products=[],this.product={},this.selectedProducts=[],this.submitted=!1,this.cols=[],this.statuses=[],this.rowsPerPageOptions=[5,10,20]}ngOnInit(){this.productService.getProducts().then(e=>this.products=e),this.cols=[{field:"product",header:"Product"},{field:"price",header:"Price"},{field:"category",header:"Category"},{field:"rating",header:"Reviews"},{field:"inventoryStatus",header:"Status"}],this.statuses=[{label:"INSTOCK",value:"instock"},{label:"LOWSTOCK",value:"lowstock"},{label:"OUTOFSTOCK",value:"outofstock"}],console.log()}openNew(){this.product={},this.submitted=!1,this.productDialog=!0}deleteSelectedProducts(){this.deleteProductsDialog=!0}editProduct(e){this.product={...e},this.productDialog=!0}deleteProduct(e){this.deleteProductDialog=!0,this.product={...e}}confirmDeleteSelected(){this.deleteProductsDialog=!1,this.products=this.products.filter(e=>!this.selectedProducts.includes(e)),this.messageService.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3}),this.selectedProducts=[]}confirmDelete(){this.deleteProductDialog=!1,this.products=this.products.filter(e=>e.id!==this.product.id),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Deleted",life:3e3}),this.product={}}hideDialog(){this.productDialog=!1,this.submitted=!1}saveProduct(){this.submitted=!0,this.product.name?.trim()&&(this.product.id?(this.product.inventoryStatus=this.product.inventoryStatus.value?this.product.inventoryStatus.value:this.product.inventoryStatus,this.products[this.findIndexById(this.product.id)]=this.product,this.messageService.add({severity:"success",summary:"Successful",detail:"Product Updated",life:3e3})):(this.product.id=this.createId(),this.product.code=this.createId(),this.product.image="product-placeholder.svg",this.product.inventoryStatus=this.product.inventoryStatus?this.product.inventoryStatus.value:"INSTOCK",this.products.push(this.product),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Created",life:3e3})),this.products=[...this.products],this.productDialog=!1,this.product={})}findIndexById(e){let i=-1;for(let o=0;o<this.products.length;o++)if(this.products[o].id===e){i=o;break}return i}createId(){let e="";for(let o=0;o<5;o++)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return e}onGlobalFilter(e,i){e.filterGlobal(i.target.value,"contains")}static{this.\u0275fac=function(i){return new(i||n)(t.rXU(b.b),t.rXU(m.bg))}}static{this.\u0275cmp=t.VBU({type:n,selectors:[["app-products"]],decls:26,vars:27,consts:[["dt",""],[1,"grid"],[1,"col-12"],[1,"card","px-6","py-6"],["styleClass","mb-4"],["pTemplate","left"],["pTemplate","right"],["responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","selectionMode","multiple","dataKey","id",3,"selectionChange","value","columns","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover"],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["header","Product Details",1,"p-fluid",3,"visibleChange","visible","modal"],["pTemplate","content"],["pTemplate","footer"],["header","Confirm",3,"visibleChange","visible","modal"],[1,"flex","align-items-center","justify-content-center"],[1,"pi","pi-exclamation-triangle","mr-3",2,"font-size","2rem"],[4,"ngIf"],[1,"my-2"],["pButton","","pRipple","","label","New","icon","pi pi-plus",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","Delete","icon","pi pi-trash",1,"p-button-danger",3,"click","disabled"],["mode","basic","accept","image/*","label","Import","chooseLabel","Import",1,"mr-2","inline-block",3,"maxFileSize"],["pButton","","pRipple","","label","Export","icon","pi pi-upload",1,"p-button-help",3,"click"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search...",1,"w-full","sm:w-auto",3,"input"],[2,"width","3rem"],["pSortableColumn","code"],["field","code"],["pSortableColumn","name"],["field","name"],["pSortableColumn","price"],["field","price"],["pSortableColumn","category"],["field","category"],["pSortableColumn","rating"],["field","rating"],["pSortableColumn","inventoryStatus"],["field","inventoryStatus"],[3,"value"],[2,"width","14%","min-width","10rem"],[1,"p-column-title"],[2,"width","14%","min-width","8rem"],[3,"ngModel","readonly","cancel"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-pencil",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash",1,"p-button-rounded","p-button-warning",3,"click"],["width","150","class","mt-0 mx-auto mb-5 block shadow-2",3,"src","alt",4,"ngIf"],[1,"field"],["for","name"],["type","text","pInputText","","id","name","required","","autofocus","",3,"ngModelChange","ngModel","ngClass"],["class","ng-dirty ng-invalid",4,"ngIf"],["for","description"],["id","description","pInputTextarea","","required","","rows","3","cols","20",3,"ngModelChange","ngModel"],["for","status"],["inputId","inventoryStatus","optionValue","label","placeholder","Select",3,"ngModelChange","ngModel","options"],["pTemplate","selectedItem"],["pTemplate","item"],[1,"mb-3"],[1,"formgrid","grid"],[1,"field-radiobutton","col-6"],["id","category1","name","category","value","Accessories",3,"ngModelChange","ngModel"],["for","category1"],["id","category2","name","category","value","Clothing",3,"ngModelChange","ngModel"],["for","category2"],["id","category3","name","category","value","Electronics",3,"ngModelChange","ngModel"],["for","category3"],["id","category4","name","category","value","Fitness",3,"ngModelChange","ngModel"],["for","category4"],[1,"field","col"],["for","price"],["id","price","mode","currency","currency","USD","locale","en-US",3,"ngModelChange","ngModel"],["for","quantity"],["id","quantity",3,"ngModelChange","ngModel"],["width","150",1,"mt-0","mx-auto","mb-5","block","shadow-2",3,"src","alt"],[1,"ng-dirty","ng-invalid"],[3,"class",4,"ngIf"],["pButton","","pRipple","","label","Cancel","icon","pi pi-times",1,"p-button-text",3,"click"],["pButton","","pRipple","","label","Save","icon","pi pi-check",1,"p-button-text",3,"click"],["pButton","","pRipple","","icon","pi pi-times","label","No",1,"p-button-text",3,"click"],["pButton","","pRipple","","icon","pi pi-check","label","Yes",1,"p-button-text",3,"click"]],template:function(i,o){if(1&i){const r=t.RV6();t.j41(0,"div",1)(1,"div",2)(2,"div",3),t.nrm(3,"p-toast"),t.j41(4,"p-toolbar",4),t.DNE(5,N,3,1,"ng-template",5)(6,G,2,1,"ng-template",6),t.k0s(),t.j41(7,"p-table",7,0),t.mxI("selectionChange",function(c){return t.eBV(r),t.DH7(o.selectedProducts,c)||(o.selectedProducts=c),t.Njj(c)}),t.DNE(9,B,6,0,"ng-template",8)(10,E,22,0,"ng-template",9)(11,V,33,14,"ng-template",10),t.k0s()(),t.j41(12,"p-dialog",11),t.mxI("visibleChange",function(c){return t.eBV(r),t.DH7(o.productDialog,c)||(o.productDialog=c),t.Njj(c)}),t.DNE(13,U,45,15,"ng-template",12)(14,A,2,0,"ng-template",13),t.k0s(),t.j41(15,"p-dialog",14),t.mxI("visibleChange",function(c){return t.eBV(r),t.DH7(o.deleteProductDialog,c)||(o.deleteProductDialog=c),t.Njj(c)}),t.j41(16,"div",15),t.nrm(17,"i",16),t.DNE(18,J,5,1,"span",17),t.k0s(),t.DNE(19,$,2,0,"ng-template",13),t.k0s(),t.j41(20,"p-dialog",14),t.mxI("visibleChange",function(c){return t.eBV(r),t.DH7(o.deleteProductsDialog,c)||(o.deleteProductsDialog=c),t.Njj(c)}),t.j41(21,"div",15),t.nrm(22,"i",16),t.j41(23,"span"),t.EFF(24,"Are you sure you want to delete selected products?"),t.k0s()(),t.DNE(25,K,2,0,"ng-template",13),t.k0s()()()}2&i&&(t.R7$(7),t.Y8G("value",o.products)("columns",o.cols)("rows",10)("globalFilterFields",t.lJ4(22,T))("paginator",!0)("rowsPerPageOptions",t.lJ4(23,D))("showCurrentPageReport",!0),t.R50("selection",o.selectedProducts),t.Y8G("rowHover",!0),t.R7$(5),t.Aen(t.lJ4(24,_)),t.R50("visible",o.productDialog),t.Y8G("modal",!0),t.R7$(3),t.Aen(t.lJ4(25,_)),t.R50("visible",o.deleteProductDialog),t.Y8G("modal",!0),t.R7$(3),t.Y8G("ngIf",o.product),t.R7$(2),t.Aen(t.lJ4(26,_)),t.R50("visible",o.deleteProductsDialog),t.Y8G("modal",!0))},dependencies:[u.YU,u.bT,a.XI,m.Ei,a.Tg,a.yc,a.S9,a.nA,C.l,j.n,y._f,P.y8,k.M,g.S,v.Z,F.N,R.ms,S.a,x.GW,p.me,p.BC,p.YS,p.vS,I.YI,u.oe]})}}return n})(),z=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=t.$C({type:n})}static{this.\u0275inj=t.G2t({imports:[f.iI.forChild([{path:"",component:L}]),f.iI]})}}return n})();var Z=s(4799),W=s(935);let Q=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=t.$C({type:n})}static{this.\u0275inj=t.G2t({providers:[m.bg,m.td,b.b],imports:[u.MD,z,a.bG,C.P,j.Z,y.tm,P.MB,k.m,Z.F,g.u,v.f,F.e,R.kr,W.$,S.Ko,x.wZ,g.u,p.YN,I.O3]})}}return n})()}}]);