import "./App.css";
import { students } from "./data/student.jsx";

function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  if (score >= 50) return "E";
  if (score < 50) return "F";
}

function StudentRow({ student, index, isTopstudent }) {
  const grade = getGrade(student.score);

  return (
    <tr className={isTopstudent ? "top-student" : ""}>
      <td>{index + 1}</td>
      <td className="student-name">
        {student.name}
        {isTopstudent && <span className="top-student-badge">Top Student</span>}
      </td>
      <td>{student.track}</td>
      <td>{student.score}</td>
      <td>
        <span className={`grade grade-${grade.toLowerCase()}`}>{grade}</span>
      </td>
    </tr>
  );
}

function Resultboard() {
  const sortedStudents = [...students].sort((a, b) => {
    
    const trackOder = {
      Frontend: 0,
      Backend: 1,
    };

    return (
      trackOder[a.track] - trackOder[b.track] || 
      b.score - a.score
    )
  });

  const highestScore =
    students.length > 0
      ? Math.max(...students.map((student) => student.score))
      : null;

  return (
    <section className="resultboard">
      <div className="resultboard-header">
        <h2>Student Results</h2>
        <p>View student Performance and examination results</p>
      </div>
      <span className="student-count">
        The total number of students is {students.length}
      </span>
      {sortedStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="table-container">
          <table className="result-table">
            <thead>
              <th>#</th>
              <th>Name</th>
              <th>Track</th>
              <th>Score</th>
              <th>Grade</th>
            </thead>

            <tbody>
              {sortedStudents.map((student, index) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  index={index}
                  isTopstudent={student.score === highestScore}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function App() {
  return (
    <>
      <Resultboard results={students} />
    </>
  );
}

export default App;