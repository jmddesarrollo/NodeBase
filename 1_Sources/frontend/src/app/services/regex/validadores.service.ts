import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class ValidadoresService {
  constructor() {

  }

  /**
   * Validación del formato del nombre
   * El guión debe ir el último pq sino entiende que buscamos entre caracteres anterior y posterior.
   */
  valNombre(control: FormControl): { [s: string]: boolean } {
    const nombreRegex = new RegExp(
      '^[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜçÇ _-]{0,999}$'
    );
    if (control.value && !nombreRegex.test(control.value.trim())) {
      return { formatoNombre: true };
    }

    return null;
  }

  /**
   * Validación del formato de los apellidos
   */
  valApellidos(control: FormControl): { [s: string]: boolean } {
    const apellRegex = new RegExp(
      '^[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜçÇ _-]{0,999}$'
    );
    if (control.value && !apellRegex.test(control.value.trim())) {
      return { formatoApellidos: true };
    }

    return null;
  }

  /**
   * Validación del formato del email
   */
  valEmail(control: FormControl): { [s: string]: boolean } {
    const emailRegex = new RegExp(
      '(^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6}))'
    );
    if (control.value && !emailRegex.test(control.value.trim())) {
      return { formatoEmail: true };
    }

    return null;
  }

  /**
   * Validación del formato del email
   */
  valNumero(control: FormControl): { [s: string]: boolean } {
    const numeroRegex = new RegExp(
      '(^([0-9])*$)'
    );
    if (control.value && !numeroRegex.test(control.value.trim())) {
      return { formatoNumero: true };
    }

    return null;
  }

  /**
   * Validación del formato de contraseña fuerte
   */
  // RegEx	Description
  // ^	The password string will start this way
  // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
  // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
  // (?=.*[0-9])	The string must contain at least 1 numeric character
  // (?=.[!@#\$%\^&])	The string must contain at least one special character,
  //                  but we are escaping reserved RegEx characters to avoid conflict
  // (?=.{8,})	The string must be eight characters or longer
  validarPasswordStrong(control: FormControl): { [s: string]: boolean }  {
    const pwdStrongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'
    );
    if (control.value && !pwdStrongRegex.test(control.value.trim())) {
      return { formatoPassword: true };
    }

    return null;
  }

  /**
   * Validación del formato de contraseña nivel medio
   */
  validarPasswordMedium(control: FormControl): { [s: string]: boolean }  {
    const pwdMediumRegex = new RegExp(
      '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,18})'
    );
    if (control.value && !pwdMediumRegex.test(control.value.trim())) {
      return { formatoPassword: true };
    }

    return null;
  }

  /**
   * Validación de la longitud mínima de un texto requerido.
   */
  textoMinimo2(control: FormControl): { [s: string]: boolean } {
    if (control.value === null || control.value.trim().length < 2) {
      return { mintext: true };
    }
    return null;
  }

  /**
   * Validación de la longitud mínima de un texto requerido.
   */
  textoMinimo6(control: FormControl): { [s: string]: boolean } {
    if (control.value === null || control.value.trim().length < 6) {
      return { mintext: true };
    }
    return null;
  }

  /**
   * Validación de la longitud máxima de un texto requerido.
   */
  textoMaximo15(control: FormControl): { [s: string]: boolean } {
    if (control.value === null || control.value.trim().length > 15) {
      return { maxtext: true };
    }
    return null;
  }
  textoMaximo45(control: FormControl): { [s: string]: boolean } {
    if (control.value === null || control.value.trim().length > 45) {
      return { maxtext: true };
    }
    return null;
  }
  textoMaximo60(control: FormControl): { [s: string]: boolean } {
    if (control.value === null || control.value.trim().length > 60) {
      return { maxtext: true };
    }
    return null;
  }
  textoMaximo100(control: FormControl): { [s: string]: boolean } {
    if (control.value === null || control.value.trim().length > 100) {
      return { maxtext: true };
    }
    return null;
  }

  /**
   * Comprobar que las contraseñas son iguales
   */
  sonIguales(str1: string, str2: string) {
    return (group: FormGroup) => {
      const strVal1 = group.controls[str1].value;
      const strVal2 = group.controls[str2].value;
      if (strVal1 === strVal2) {
        return null;
      }

      return { sonIguales: true };
    };
  }

  /**
   * Validación del formato de una URL
   */
  validarFecha(control: FormControl): { [s: string]: boolean }  {
    const fechaRegex = new RegExp(
      '^(20[0-9][0-9])([\-/.])(0?[1-9]|1[1-2])(3[01]|[12][0-9]|0?[1-9])'
    );
    if (control.value && !fechaRegex.test(control.value.trim())) {
      return { formatoFecha: true };
    }

    return null;
  }

  /**
   * Validación del formato de una URL
   */
  validarUrl(control: FormControl): { [s: string]: boolean }  {
    const urlRegex = new RegExp(
      '^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?'
    );
    if (control.value && !urlRegex.test(control.value.trim())) {
      return { formatoUrl: true };
    }

    return null;
  }

  /**
   * Validación del formato de una IP
   */
  validarIP(control: FormControl): { [s: string]: boolean } {
    const ipRegex = new RegExp(
      '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
    );
    if (control.value && !ipRegex.test(control.value.trim())) {
      return { formatoIp: true };
    }

    return null;
  }

  // RegEx	Description
  // ^	The password string will start this way
  // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
  // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
  // (?=.*[0-9])	The string must contain at least 1 numeric character
  // (?=.[!@#\$%\^&])	The string must contain at least one special character,
  //                  but we are escaping reserved RegEx characters to avoid conflict
  // (?=.{8,})	The string must be eight characters or longer
  validarPasswordStrongSinFormControl(password): boolean {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const resultado = strongRegex.test(password);

    return resultado;
  }

  validarPasswordMediumSinFormControl(password): boolean {
    const mediumRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,18})');
    const resultado = mediumRegex.test(password);

    return resultado;
  }

}
