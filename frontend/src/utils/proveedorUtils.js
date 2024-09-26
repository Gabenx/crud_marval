// Función para validar los nombres (solo letras)
export const validarNombre = (value) => {
    const regex = /^[A-Za-zÀ-ÿ\s]*$/;
    return regex.test(value); // Retorna true si es válido
  };
  
// Función para validar las cédulas (solo números)
export const validarCedula = (value) => {
    const regex = /^[0-9]*$/;
    return regex.test(value); // Retorna true si es válido
  };


// Maneja los cambios generales en el proveedor
export const handleChange = (e, setProveedor) => {
    const { name, value } = e.target;
  
    if ((name === 'nombre' || name === 'apellido') && !validarNombre(value)) {
      return; // Evitar caracteres no deseados en nombre o apellido
    }
  
    if ((name === 'nit' || name === 'cedula') && !validarCedula(value)) {
      return; // Evitar caracteres no deseados en NIT o cédula
    }
  
    setProveedor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
// Maneja los cambios en los beneficiarios
export const handleBeneficiarioChange = (index, field, value, beneficiarios, setProveedor) => {
    const updatedBeneficiarios = [...beneficiarios];
  
    if (field === 'nombre' && !validarNombre(value)) {
      return; // Evitar caracteres no deseados en nombre
    }
  
    if (field === 'cedula' && !validarCedula(value)) {
      return; // Evitar caracteres no deseados en cédula
    }
  
    updatedBeneficiarios[index][field] = value;
    setProveedor((prevState) => ({
      ...prevState,
      beneficiarios: updatedBeneficiarios,
    }));
  };

// Maneja los cambios en los datos bancarios
export const handleDatosBancariosChange = (name, value, setProveedor) => {

    if (name === 'banco' && !validarNombre(value)) {
        return; // Evitar caracteres no deseados en el nombre del banco
    }

    if (name === 'cuenta' && !validarCedula(value)){
        return; // Evitar caracteres no deseados en el numero de cuenta
    }
    setProveedor((prevState) => ({
        ...prevState,
        datos_bancarios: {
            ...prevState.datos_bancarios,
            [name]: value,
        },
    }));
};

// Agregar un beneficiario extra
export const handleAddBeneficiario = (setProveedor, proveedor) => {
    setProveedor({
    ...proveedor,
    beneficiarios: [...proveedor.beneficiarios, { nombre: '', cedula: '' }],
    });
  };

