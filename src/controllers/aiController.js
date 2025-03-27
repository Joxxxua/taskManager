
process.env.OPENAI_API_KEY
process.env.TAVILY_API_KEY 

// AiController.js
import Task from "../models/TaskModel.js";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

// IMPORTANTE: Em ambiente de produção, use variáveis de ambiente
// Substitua estes valores por referências a process.env.OPENAI_API_KEY, etc.
// Nunca coloque chaves de API diretamente no código

class AiController {
    // Configurar o agente
    static setupAgent() {
        const agentTools = [new TavilySearchResults({ maxResults: 3 })];
        const agentModel = new ChatOpenAI({ temperature: 0 });
        const agentCheckpointer = new MemorySaver();
        
        return createReactAgent({
            llm: agentModel,
            tools: agentTools,
            checkpointSaver: agentCheckpointer,
        });
    }
    // Inicializar o agente uma vez para reutilização
    static agent = AiController.setupAgent();
    
    // Método para processar chat geral
    static async processChat(req, res) {
        try {
            const { message, sessionId = "default" } = req.body;
            
            if (!message) {
                return res.status(400).json({ error: "Mensagem é obrigatória" });
            }
            
            const agentResult = await AiController.agent.invoke(
                { messages: [new HumanMessage(message)] },
                { configurable: { thread_id: sessionId } }
            );
            
            const lastMessage = agentResult.messages[agentResult.messages.length - 1];
            
            res.json({
                response: lastMessage.content,
                sessionId: sessionId
            });
            
        } catch (error) {
            console.error("Erro ao processar chat:", error);
            res.status(500).json({ error: "Falha ao processar solicitação de chat" });
        }
    }
    
    // Método para analisar uma tarefa
    static async analyzeTask(req, res) {
        try {
            const { taskId, sessionId = "default" } = req.body;
            
            if (!taskId) {
                return res.status(400).json({ error: "ID da tarefa é obrigatório" });
            }
            
            // Buscar tarefa do banco de dados
            const task = await Task.findById(taskId);
            
            if (!task) {
                return res.status(404).json({ error: "Tarefa não encontrada" });
            }
            
            // Formatar mensagem com detalhes da tarefa
            const taskMessage = `Analise esta tarefa:
            Título: ${task.title}
            Descrição: ${task.description || 'Sem descrição'}
            Prazo: ${task.dueDate || 'Não definido'}
            Status: ${task.status || 'Pendente'}
            Categorias: ${task.categories?.length > 0 ? 'Sim' : 'Não definidas'}
            
            Por favor, forneça:
            1. Uma avaliação da complexidade da tarefa
            2. Sugestões para dividir em subtarefas, se aplicável
            3. Recomendações para priorização
            4. Estimativa de tempo para conclusão`;
            
            const agentResult = await AiController.agent.invoke(
                { messages: [new HumanMessage(taskMessage)] },
                { configurable: { thread_id: sessionId } }
            );
            
            const lastMessage = agentResult.messages[agentResult.messages.length - 1];
            
            res.json({
                taskId: taskId,
                analysis: lastMessage.content,
                sessionId: sessionId
            });
            
        } catch (error) {
            console.error("Erro ao analisar tarefa:", error);
            res.status(500).json({ error: "Falha ao analisar tarefa" });
        }
    }
    
}

export default AiController;