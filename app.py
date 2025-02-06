from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.text_splitter import CharacterTextSplitter
import os
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
CORS(app)
# Load resume content
resume_content = """NIRMAL BOGHARA
Brooklyn, NY | nb3964@nyu.edu | +1347-628-3769 | Portfolio | Linkedin | Github
Education
New York University, MS in Computer Science • Coursework: Algorithms, Information Security and Privacy, Database Systems, Machine Learning, Big Data
University of Mumbai, BE in Computer Engineering • Coursework: Operating Systems, Machine Learning, Computer Networks, Applied Cryptography, Data Structures
Experience
Expected May 2026
Jun 2024
Software Engineering Intern, Bitnine – San Francisco, CA Apr 2024 – Jun 2024
• Optimized PostgreSQL databases with Oracle compatibility on AWS, improving complex query performance by 23% for
enterprise-scale fintech applications. Optimized & enhanced ODBC C driver for PostgreSQL databases.
• Resolved 20+ critical issues in the Python driver for Apache AGE project as an open-source contributor, enhancing its
stability and reliability. Initiated Oracle OCI driver development in C for PostgreSQL databases from scratch, achieving
compatibility with Oracle and scalability, and providing a framework for subsequent phases.
Artificial Intelligence Intern, Soulible Digital – Maharashtra, India Sep 2023 – Nov 2023
• Built a computer vision system using YOLOv7 and TensorFlow, automating attendance tracking for 200+ employees and
reducing manual effort by 50%.
• Analyzed the face recognition attendance system using Python, NumPy, and Pandas, collaborating with cross-functional
teams to implement optimizations, boosting efficiency by 30%.
Software Development Engineer Intern, Feat Systems – Maharashtra, India May 2023 – Aug 2023
• Improved Java/Spring Boot applications using Agile methodologies, reducing customer complaints by 15% and streamlining
CI/CD workflows with Jira and GitHub.
• Developed comprehensive documentation for the software development lifecycle, leveraging GitHub for version control and
Jira for task management, ensuring seamless collaboration and accessibility of resources
• Implemented efficient MySQL-based solutions to streamline access to critical information, achieving a 30% improvement in
onboarding speed for new team members and boosting team productivity.
Full Stack Developer Intern, Goldenmace IT Solutions – Maharashtra, India May 2022 – Jul 2022
• Designed a full-stack dashboard using TypeScript, Svelte, and MongoDB, boosting client satisfaction by 20% through
performance optimization and intuitive UI/UX.
• Implemented TypeScript and Svelte for code optimization and caching mechanisms, boosting dashboard performance by
30%. Integrated PostgreSQL and MongoDB for data storage, ensuring fast and efficient data retrieval.
Technical Skills
Languages: Java, Python, C#, SQL, JavaScript, HTML, R, Golang
Frameworks & Libraries: Django, Node.js, React.js, Svelte, TypeScript, Springboot, PHP, Three.js, WebGPU
Tools: Git, Github, AWS, Kubernetes, Docker, MS Excel, VSCode, Jira, Microsoft Azure, Matlab
Machine Learning: TensorFlow, PyTorch, Scikit-learn, Keras, NumPy, Pandas, Matplotlib, ONNX Runtime
Data: PostgreSQL, MySQL, MongoDB, Apache Kafka, Hive, Hadoop, Tableau, PowerBI, Scala
Projects
Tutor.ai (Local LLMs, ONNX Runtime, LM Studio, RAG, Streamlit, NPU, Machine Learning) Github Link
• Built a low-latency AI teaching assistant using Local LLMs (Llama 3.2B) and ONNX Runtime, enabling offline access for rural
educators and achieving 92% accuracy via RAG architecture. Wrapped by Streamlit, where teachers can choose variety of
options to help students in their studies.
FitFarm - Smart Agriculture System (Machine Learning, Python, IoT, JavaScript) Github Link
• Trained ML algorithms (SVM, Random Forest) using Python, TensorFlow, and Scikit-learn to predict the most suitable crops
according to soil conditions with 93% accuracy. Published a research paper in the IJRASET.
Zinzraa - Top E-commerce on AJIO (ExpressJS, Vite+React, Node.js, MongoDB) Website Link
• Spearheaded a user-friendly interface for the shopping website, incorporating MERN Stack, leading to a 20% increase in user
engagement and a 15% decrease in bounce rate. Deployed CRM and SEO tools to optimize web content and drive organic
traffic, resulting in a 30% increase in conversion rates and boost in online sales revenue.
Fittify - One Stop Health Platform (MERN Stack) Github Link
• Engineered a comprehensive health solution using React.js and Node.js, piloting it with 150 students. Achieved 95% user
satisfaction and 25% improvement in health metrics through personalized medical record tracking, diet plans, and workout
routines. Successfully scaled to 500+ users while maintaining performance and intuitive UI made with Tailwind CSS."""

# Initialize AI components
try:
    # Split text into chunks with overlap
    text_splitter = CharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separator="\n"
    )
    texts = text_splitter.split_text(resume_content)
    
    # Create embeddings and vector store
    embeddings = OpenAIEmbeddings()
    vector_store = FAISS.from_texts(texts, embeddings)
    
    # Initialize LLM with explicit API key
    llm = ChatOpenAI(
        temperature=0.3,
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        model="gpt-3.5-turbo"
    )
except Exception as e:
    print(f"Initialization error: {str(e)}")
    raise

# Improved prompt template
prompt = ChatPromptTemplate.from_template("""
You're Nirmal Boghara's professional assistant. Answer questions 
based strictly on this context:
{context}

If the answer isn't in the context, say "I don't have that information, 
but feel free to ask me about my professional background!"

Question: {input}
""")

document_chain = create_stuff_documents_chain(llm, prompt)

@app.route('/ask', methods=['POST'])
def ask():
    try:
        query = request.json['question']
        print(f"Received query: {query}")
        # Get relevant documents with score threshold
        docs = vector_store.similarity_search_with_relevance_scores(
            query,
            k=3,
            score_threshold=0.7
        )
        print(f"Found {len(docs)} relevant documents")
        
        # Check if any documents meet the relevance threshold
        if not docs or docs[0][1] < 0.7:
            return jsonify({"answer": "I don't have that specific information. Please ask me about my professional experience listed in my resume!"})
        
        response = document_chain.invoke({
            "input": query,
            "context": [doc[0].page_content for doc in docs]
        })
        return jsonify({"answer": response})
    
    except Exception as e:
        app.logger.error(f"API Error: {str(e)}")
        return jsonify({"error": "Failed to process question"}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)