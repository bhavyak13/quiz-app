import { useState, useEffect } from 'react';
import Timer from "../Timer/Timer.jsx"
import { useNavigate } from "react-router-dom";
import './Quiz.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



function Quiz() {

    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [deadline, setDeadline] = useState();

    useEffect(() => {
        const questions = JSON.parse(localStorage.getItem('questions'));
        if (questions) {
            setQuestions(questions);
        }
        const deadline__ = JSON.parse(localStorage.getItem('deadline'));
        if (deadline__) {
            setDeadline(deadline__);
        }

    }, []);

    function submitQuiz() {
        localStorage.setItem('questions', JSON.stringify(questions));
        navigate("/quiz-app/summary");
    }

    function toogleResponse(e) {
        const myNextList = [...questions];
        const ques = myNextList.find(
            a => (a.id === currentQuestionId)
        );
        ques.selected = parseInt(e.target.value);
        // console.log(myNextList);
        setQuestions(myNextList);
    }

    function changeQuestionId(questionId) {
        if (questionId === currentQuestionId) return;
        questions[questionId].visited = true;
        setCurrentQuestionId(questionId);
    }


    if (!questions.length) {
        return <div> Please Wait </div>
    }
    else {
        return (
            <div style={{ height: '85vh' }} >
                <Timer
                    deadline={deadline}
                    submitQuiz={submitQuiz}
                />





                <div className='root_quiz'>
                    <div className="left_">
                        {questions.map((question, indx) => (
                            <div className={
                                question.selected >= 0
                                    ? 'box_ answered'
                                    : ((question.visited) ? 'box_ visited' : 'box_')} onClick={() => changeQuestionId(question.id)} key={question.id}>
                                <p>
                                    {question.id + 1}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="right_">

                        <Card
                            style={{ width: '18rem', height: '25rem' }}
                            bg='info'
                        >
                            <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Card.Title
                                    style={{ marginBottom: '1rem' }}
                                >Question {currentQuestionId + 1}
                                </Card.Title>
                                <Card.Text>
                                    {questions[currentQuestionId].question}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                {questions[currentQuestionId].answersArray.map((a, indx) => (
                                    <ListGroup.Item variant="dark" >
                                        <div key={indx} className='right_option'>
                                            <input type="radio"
                                                id={`this_is_${indx}`}
                                                name={currentQuestionId}
                                                value={indx}
                                                checked={questions[currentQuestionId].selected === indx}
                                                onChange={toogleResponse}
                                            />
                                            <label htmlFor={`this_is_${indx}`}>{a}</label>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>


                    </div >
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.2rem' }}>
                    <Button variant="success" size="lg" onClick={submitQuiz}>SUBMIT</Button>{' '}
                </div>
            </div >
        );
    }
}

export default Quiz;
