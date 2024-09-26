// Función para validar los nombres (solo letras)
export const validarNombre = (value) => {
    const regex = /^[A-Za-zÀ-ÿ\s]*$/;
    return regex.test(value); 
  };
  
// Función para validar las cédulas (solo números)
export const validarCedula = (value) => {
    const regex = /^[0-9]*$/;
    return regex.test(value); 
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

// Función de validación para campos vacíos
export const validarCampos = (proveedor) => {
  // Verifica los campos que no deben estar vacíos
  const { nit, nombre, apellido, cedula, tipo_proveedor, tipo_persona, datos_bancarios } = proveedor;

  if (!nit || !nombre || !apellido || !cedula || !tipo_proveedor || !tipo_persona) {
    return false; 
  }

  // Verifica que los campos de datos bancarios no estén vacíos
  if (!datos_bancarios.banco || !datos_bancarios.cuenta || !datos_bancarios.tipo_cuenta) {
    return false; 
  }

  // Verifica que los beneficiarios no estén vacíos 
  if (proveedor.beneficiarios && proveedor.beneficiarios.length > 0) {
    for (let beneficiario of proveedor.beneficiarios) {
      if (!beneficiario.nombre || !beneficiario.cedula) {
        return false; 
      }
    }
  }

  return true; 
};
