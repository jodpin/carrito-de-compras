import { useState } from "react";
import axios from "axios";
import md5 from "md5";
const url = "http://localhost:5000/users";


export const useForm = (initialForm, validateForm, toggleFormSignIn) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    setLoading(true);
    e.preventDefault();
    form.password = md5(form.password);
    toggleFormSignIn();
    await axios
      .post(url, form)
      .then((response) => {
        setResponse(true);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
    //con este condicional comprobamos si el OBJETO errors tiene algun elemento 
    //("en este caso evaluando las keys") para de esa manera enviar el formulario
    if (Object.keys(errors).length === 0) {
      alert("enviando formulario");
    } else {
      return;
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
