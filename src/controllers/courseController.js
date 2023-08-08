const Course = require("../models/Course");

// Função para listar todos os cursos
async function getAllCourses(req, res) {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar cursos." });
  }
}

// Função para buscar um curso por ID
async function getCourseById(req, res) {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Curso não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar o curso." });
  }
}

// Função para criar um novo curso
async function createCourse(req, res) {
  const { title, description } = req.body;
  try {
    const newCourse = await Course.create({ title, description });
    res.status(201).json(newCourse);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erro ao criar curso.", error: err.message });
  }
}

// Função para atualizar um curso existente
async function updateCourse(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: "Curso não encontrado." });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar curso.", error: err.message });
  }
}

// Função para excluir um curso
async function deleteCourse(req, res) {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (deletedCourse) {
      res.json({ message: "Curso excluído com sucesso." });
    } else {
      res.status(404).json({ message: "Curso não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir curso." });
  }
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
