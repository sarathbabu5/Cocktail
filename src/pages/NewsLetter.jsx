import axios from "axios";
import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

const newsLetterUrl = "https://www.course-api.com/cocktails-newsletter";

export const action = async ({ request }) => {
  // console.log(request);
  const formData = await request.formData();
  // console.log(formData);
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    const response = await axios.post(newsLetterUrl, data);
    console.log(response);
    toast.success(response.data.msg);
    return redirect("/");
  } catch (error) {
    console.log(error);
    toast.error(error?.message);
    toast.error(error?.data?.msg);
  }

  return null;
};

const NewsLetter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
        our newsletter
      </h4>
      {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          className="form-input"
          name="name"
          id="name"
          required
          defaultValue="flm"
        />
      </div>
      {/* last Name  */}
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          last name
        </label>
        <input
          type="text"
          className="form-input"
          name="lastName"
          id="lastName"
          defaultValue="eduTech"
          required
        />
      </div>
      {/* email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="email"
          className="form-input"
          name="email"
          id="email"
          defaultValue="test@test.com"
          required
        />
      </div>
      <button type="submit" className="btn btn-block" disabled={isSubmitting}>
        {isSubmitting ? "submitting..." : "submit"}
      </button>
    </Form>
  );
};

export default NewsLetter;
