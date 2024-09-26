// Función para validar los nombres (solo letras)
const validarLetras = (value) => {
  const regex = /^[A-Za-zÀ-ÿ\s]*$/;
  return regex.test(value);
};

// Función para validar los campos numéricos
const validarNumeros = (value) => {
  const regex = /^[0-9]*$/;
  return regex.test(value);
};

const validarProveedor = (value) => {
  acceptedValues = ["Nacional", "Internacional"];
  return acceptedValues.includes(value);
};

const validarPersona = (value) => {
  acceptedValues = ["Natural", "Jurídica"];
  return acceptedValues.includes(value);
};

const validarCuenta = (value) => {
  acceptedValues = ["Corriente", "Ahorros"];
  return acceptedValues.includes(value);
};

module.exports = { validarLetras, validarNumeros, validarCuenta, validarPersona, validarProveedor }