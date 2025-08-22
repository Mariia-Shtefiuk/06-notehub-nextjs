import css from "./NoteForm.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import type { NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { CreateNotePayload } from "../../services/noteService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const initialValues = {
    title: "",
    content: "",
    tag: "Todo" as NoteTag,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Too short")
      .max(50, "Too long")
      .required("Required"),
    content: Yup.string().max(500, "Too long"),
    tag: Yup.mixed<NoteTag>()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
      .required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values, {
          onSuccess: () => {
            resetForm();
          },
        });
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
      }) => (
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className={css.input}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.title && errors.title && (
              <ErrorMessage message={errors.title} />
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.content && errors.content && (
              <ErrorMessage message={errors.content} />
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select
              id="tag"
              name="tag"
              className={css.select}
              value={values.tag}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
            {touched.tag && errors.tag && <ErrorMessage message={errors.tag} />}
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create note"}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
