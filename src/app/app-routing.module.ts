import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { PasswordPromptComponent } from './password-prompt/password-prompt.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path: '',component: HomeComponent},
  { path: 'cart', component: CartComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'manage-product', component: ManageProductComponent },
  { path: 'password-prompt', component: PasswordPromptComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'content', component: ContentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'add-product', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
