import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return this.height && this.weight && this.height > 0 && this.weight > 0;
  }
  printCategory(imc: number) {
    if (imc < 18.5) return 'Magreza';
    else if (imc >= 18.5 && imc <= 24.9) return 'Normal';
    else if (imc >= 25 && imc <= 29.9) return 'Sobrepeso';
    else if (imc >= 30.0 && imc <= 39.9) return 'Obesidade';
    else return 'Obesidade grave';
  }
  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    this.showMessage(`IMC = ${imc.toFixed(2)} - ${this.printCategory(imc)}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create({
      message: msg,
      color: 'light',
      buttons: [
        {
          icon: 'close',
        },
      ],
    });
    toast.present();
  }
}
