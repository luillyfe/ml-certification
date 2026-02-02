
const IMAGES = {
    hero: "/images/hero_aesthetic.png",
    week1: "/images/week1.png",
    week2: "/images/week2.png",
    week3: "/images/week3.png",
    week4: "/images/week4.png",
    week5: "/images/week5.png",
    week6: "/images/week6.png"
};

export const heroImage = IMAGES.hero;

export const curriculum = [
    {
        id: 1,
        title: "Architecting Low-Code AI Solutions",
        weight: 13,
        desc: "Focus on BigQuery ML for SQL-based models, GenAI APIs, and AutoML for quick wins.",
        image: IMAGES.week1,
        session: {
            title: "Low-Code, High Impact",
            focus: "Accelerating AI Development with BigQuery ML & Vertex AI Agent Builder."
        },
        topics: [
            { id: "w1-t1", text: "BigQuery ML: Linear/Binary classification, Time-series forecasting", link: "https://cloud.google.com/bigquery/docs/bqml-introduction" },
            { id: "w1-t2", text: "GenAI: Model Garden & Document AI APIs", link: "https://cloud.google.com/vertex-ai/docs/start/explore-models" },
            { id: "w1-t3", text: "Vertex AI Agent Builder for RAG applications", link: "https://cloud.google.com/vertex-ai/docs/agent-builder" },
            { id: "w1-t4", text: "AutoML: Training custom models (tabular, text, image)", link: "https://cloud.google.com/vertex-ai/docs/beginner/beginners-guide" }
        ],
        quiz: [
            {
                q: "You need to build a customer churn prediction model using data stored in BigQuery. Your team consists primarily of SQL analysts. Which solution minimizes development time?",
                options: ["Export data to Cloud Storage and use Vertex AI Custom Training.", "Use BigQuery ML (BQML) to create a logistic regression model using SQL.", "Use Dataflow to preprocess data and train using TensorFlow.", "Use Vertex AI AutoML Tabular."],
                correct: 1,
                explanation: "BigQuery ML allows you to create and execute machine learning models using standard SQL queries, which is ideal for teams proficient in SQL."
            },
            {
                q: "Which BigQuery ML statement is used to create a model?",
                options: ["CREATE MODEL", "TRAIN MODEL", "BUILD MODEL", "INSERT MODEL"],
                correct: 0,
                explanation: "The standard syntax is `CREATE MODEL `project.dataset.model_name` OPTIONS(model_type='...') AS SELECT ...`."
            },
            {
                q: "You want to build a RAG (Retrieval Augmented Generation) application quickly. Which tool provides the most streamlined 'low-code' experience?",
                options: ["Vertex AI Agent Builder", "Cloud Functions with OpenAI API", "Custom TensorFlow Hub Embeddings", "BigQuery Remote Functions"],
                correct: 0,
                explanation: "Vertex AI Agent Builder allows you to build generative AI agents and search applications (RAG) using natural language with minimal coding."
            }
        ]
    },
    {
        id: 2,
        title: "Collaborating to Manage Data and Models",
        weight: 14,
        desc: "Data Engineering fundamentals, Privacy (PII), and Vertex AI Feature Store.",
        image: IMAGES.week2,
        session: {
            title: "Foundations of ML Data",
            focus: "From Chaos to Clarity: Managing Data Pipelines and Privacy."
        },
        topics: [
            { id: "w2-t1", text: "Data Preprocessing: Dataflow, Spark (Dataproc), BigQuery", link: "https://cloud.google.com/vertex-ai/docs/pipelines/data-prep" },
            { id: "w2-t2", text: "Vertex AI Feature Store: Managing features & point-in-time lookup", link: "https://cloud.google.com/vertex-ai/docs/featurestore" },
            { id: "w2-t3", text: "Data Privacy: Cloud DLP & Handling PII/PHI", link: "https://cloud.google.com/dlp/docs" },
            { id: "w2-t4", text: "Vertex AI Experiments: Tracking parameters and metrics", link: "https://cloud.google.com/vertex-ai/docs/experiments/intro-vertex-ai-experiments" }
        ],
        quiz: [
            {
                q: "What is the primary benefit of using Vertex AI Feature Store?",
                options: ["It reduces the cost of storing large datasets.", "It ensures training and serving use consistent feature definitions, preventing training-serving skew.", "It automatically cleans missing values in CSV files.", "It provides a graphical interface for SQL queries."],
                correct: 1,
                explanation: "Feature Store provides a centralized repository for features, ensuring that the features used for training are the same as those used for serving (online/batch)."
            },
            {
                q: "You have a dataset containing PII (Personally Identifiable Information) that needs to be used for training. What is the best practice?",
                options: ["Train the model on the raw data but restrict access to the model.", "Use Cloud Data Loss Prevention (DLP) to de-identify or redact PII before training.", "Encrypt the data and train the model on encrypted strings.", "Ignore the PII columns."],
                correct: 1,
                explanation: "Cloud DLP scans and de-identifies sensitive data, allowing you to use the remaining information for training without exposing PII."
            },
            {
                q: "Which tool is best for point-in-time correctness when fetching feature values for training data?",
                options: ["BigQuery", "Cloud Storage", "Vertex AI Feature Store", "Firestore"],
                correct: 2,
                explanation: "Vertex AI Feature Store supports point-in-time lookups to fetch feature values as they existed at the specific timestamp of the training event."
            }
        ]
    },
    {
        id: 3,
        title: "Scaling Prototypes into ML Models",
        weight: 18,
        desc: "Model architecture, Distributed Training, TPUs vs GPUs, and Hyperparameter Tuning.",
        image: IMAGES.week3,
        session: {
            title: "Training at Scale",
            focus: "Distributed Training and Hardware Optimization (TPU vs GPU)."
        },
        topics: [
            { id: "w3-t1", text: "Choosing Frameworks: TensorFlow, PyTorch, Scikit-learn", link: "https://cloud.google.com/vertex-ai/docs/training/exporting-model-artifacts" },
            { id: "w3-t2", text: "Compute Options: When to use TPU vs GPU", link: "https://cloud.google.com/tpu/docs/tpus-versus-gpus" },
            { id: "w3-t3", text: "Distributed Training: Reduction Server, MirroredStrategy", link: "https://www.tensorflow.org/guide/distributed_training" },
            { id: "w3-t4", text: "Hyperparameter Tuning: Vertex AI Vizier", link: "https://cloud.google.com/vertex-ai/docs/training/hyperparameter-tuning-overview" }
        ],
        quiz: [
            {
                q: "You are training a massive Transformer-based language model with large matrix multiplications. Which hardware accelerator is most cost-effective and performant on Google Cloud?",
                options: ["NVIDIA Tesla T4 GPU", "Cloud TPU (Tensor Processing Unit)", "Standard CPU with High Memory", "NVIDIA V100 GPU"],
                correct: 1,
                explanation: "TPUs are ASICs designed specifically for high-throughput tensor operations and massive matrix multiplications common in Transformer models."
            },
            {
                q: "Which distributed training strategy copies the model to every GPU and keeps a copy of the variables on each device?",
                options: ["MultiWorkerMirroredStrategy", "ParameterServerStrategy", "OneDeviceStrategy", "TPUStrategy"],
                correct: 0,
                explanation: "MirroredStrategy (and MultiWorkerMirroredStrategy) creates a replica of the model on each device and uses AllReduce to sync gradients."
            },
            {
                q: "What is Vertex AI Vizier used for?",
                options: ["Visualizing model graphs", "Automated Hyperparameter Tuning", "Data labeling", "Deploying models to edge"],
                correct: 1,
                explanation: "Vertex AI Vizier is a black-box optimization service used for automated hyperparameter tuning."
            }
        ]
    },
    {
        id: 4,
        title: "Serving and Scaling Models",
        weight: 20,
        desc: "Deployment strategies, Batch vs Online prediction, and model optimization.",
        image: IMAGES.week4,
        session: {
            title: "Production-Ready Inference",
            focus: "Strategies for scaling endpoints and simplifying models for high-performance inference."
        },
        topics: [
            { id: "w4-t1", text: "Serving: Vertex AI Endpoints (Online) vs Batch Prediction", link: "https://cloud.google.com/vertex-ai/docs/predictions/overview" },
            { id: "w4-t2", text: "Deployment: Canary, Blue/Green, A/B Testing", link: "https://cloud.google.com/vertex-ai/docs/predictions/models-deploy" },
            { id: "w4-t3", text: "Scaling: Autoscaling configuration & machine types", link: "https://cloud.google.com/vertex-ai/docs/predictions/configure-compute" },
            { id: "w4-t4", text: "Optimization: Reducing latency & model size", link: "https://cloud.google.com/vertex-ai/docs/predictions/optimized-tensorflow-runtime" }
        ],
        quiz: [
            {
                q: "You need to process 1 million images overnight to classify them. Latency is not a concern, but cost is. Which serving method should you use?",
                options: ["Vertex AI Online Prediction", "Vertex AI Batch Prediction", "Cloud Run with a custom container", "App Engine Standard"],
                correct: 1,
                explanation: "Batch Prediction is optimized for high-throughput, offline processing of large datasets and is generally more cost-effective than keeping an online endpoint running."
            },
            {
                q: "You want to test a new model version on 10% of live traffic to compare it with the current version. What feature should you use?",
                options: ["Traffic Splitting on Vertex AI Endpoints", "Redeploy the endpoint with only the new model", "Create a separate endpoint and ask the client to randomize requests", "Use BigQuery ML evaluation"],
                correct: 0,
                explanation: "Vertex AI Endpoints support traffic splitting, allowing you to route a specific percentage of traffic (e.g., 10%) to a new model version (Canary/A/B testing)."
            },
            {
                q: "Your online prediction endpoint is experiencing high latency during spikes. What should you configure?",
                options: ["Increase the `max_replica_count` in autoscaling settings.", "Switch to Batch Prediction.", "Use a smaller machine type.", "Reduce the number of features."],
                correct: 0,
                explanation: "Configuring autoscaling (min/max replicas) ensures the endpoint scales up nodes to handle traffic spikes and maintain low latency."
            }
        ]
    },
    {
        id: 5,
        title: "Automating and Orchestrating ML Pipelines",
        weight: 22,
        desc: "CI/CD for ML, Vertex AI Pipelines (Kubeflow), and Metadata tracking.",
        image: IMAGES.week5,
        session: {
            title: "The Art of MLOps",
            focus: "Automating the Lifecycle: From CI/CD to Orchestration."
        },
        topics: [
            { id: "w5-t1", text: "Orchestration: Vertex AI Pipelines vs Cloud Composer", link: "https://cloud.google.com/vertex-ai/docs/pipelines/introduction" },
            { id: "w5-t2", text: "TFX: TensorFlow Extended components (Validator, Transform)", link: "https://www.tensorflow.org/tfx" },
            { id: "w5-t3", text: "CI/CD: Cloud Build for retraining & deployment", link: "https://cloud.google.com/vertex-ai/docs/pipelines/build-pipeline" },
            { id: "w5-t4", text: "Metadata: Tracking lineage with Vertex ML Metadata", link: "https://cloud.google.com/vertex-ai/docs/ml-metadata/introduction" }
        ],
        quiz: [
            {
                q: "Which managed service is the standard for running Kubeflow Pipelines on Google Cloud?",
                options: ["Google Kubernetes Engine (Standard)", "Vertex AI Pipelines", "Cloud Functions", "App Engine"],
                correct: 1,
                explanation: "Vertex AI Pipelines is a serverless, managed service specifically designed to run Kubeflow Pipelines (and TFX) without managing the underlying cluster."
            },
            {
                q: "In a TFX pipeline, which component is responsible for checking if the new data matches the expected schema?",
                options: ["ExampleGen", "StatisticsGen", "ExampleValidator", "Trainer"],
                correct: 2,
                explanation: "ExampleValidator identifies anomalies in training and serving data by comparing data statistics against a schema."
            },
            {
                q: "You want to automatically retrain a model whenever new data arrives in Cloud Storage. Which tool sequence works best?",
                options: ["Cloud Storage Trigger -> Cloud Functions -> Vertex AI Pipeline", "Cloud Logging -> Pub/Sub -> Dataflow", "Cron Job -> VM Script", "Manual Trigger"],
                correct: 0,
                explanation: "A standard event-driven pattern is using a Cloud Storage Object Finalize trigger to invoke a Cloud Function, which then submits a Vertex AI Pipeline job."
            }
        ]
    },
    {
        id: 6,
        title: "Monitoring AI Solutions",
        weight: 13,
        desc: "Model monitoring (Skew/Drift), Explainable AI, and Trust.",
        image: IMAGES.week6,
        session: {
            title: "Trust & Transparency",
            focus: "Responsible AI: Monitoring, Bias, and Explainability."
        },
        topics: [
            { id: "w6-t1", text: "Drift Detection: Training-Serving Skew vs Prediction Drift", link: "https://cloud.google.com/vertex-ai/docs/model-monitoring/overview" },
            { id: "w6-t2", text: "Explainable AI: Feature Attribution (Integrated Gradients, Shapley)", link: "https://cloud.google.com/vertex-ai/docs/explainable-ai/overview" },
            { id: "w6-t3", text: "Bias & Fairness: Continuous evaluation", link: "https://cloud.google.com/vertex-ai/docs/evaluation/introduction" },
            { id: "w6-t4", text: "Troubleshooting: Common training failures", link: "https://cloud.google.com/vertex-ai/docs/training/troubleshooting" }
        ],
        quiz: [
            {
                q: "What is 'Training-Serving Skew'?",
                options: ["When the model's performance degrades over time due to changing real-world data.", "When the data distribution seen in production is different from the training data distribution.", "When the feature values used for training differ from those available during serving (e.g., logic mismatch).", "When the model is biased against a certain group."],
                correct: 2,
                explanation: "Skew specifically refers to a mismatch between the data/logic used during training and what is actually used/available during serving."
            },
            {
                q: "Which metric is commonly used by Vertex AI Model Monitoring to detect drift in numerical features?",
                options: ["Jensen-Shannon Divergence", "Euclidean Distance", "Cosine Similarity", "Accuracy"],
                correct: 0,
                explanation: "Vertex AI uses Jensen-Shannon Divergence (and L-infinity distance for categorical) to quantify the difference between two probability distributions."
            },
            {
                q: "Which Explainable AI method is model-agnostic and based on cooperative game theory?",
                options: ["Integrated Gradients", "Sampled Shapley", "XRAI", "Attention weights"],
                correct: 1,
                explanation: "Shapley values (Sampled Shapley in Vertex AI) are based on game theory and attribute the prediction output fairly among the input features."
            }
        ]
    }
];
