import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import { ScriptNode, ScriptResponse, ScriptStage, Plan, CommercialProof, QuickAnswer } from '../../types/script';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Layers, 
  FileText, 
  Award, 
  HelpCircle, 
  Search,
  ChevronRight,
  GitBranch
} from 'lucide-react';

interface ScriptBuilderViewProps {
  onBackToHome: () => void;
}

export const ScriptBuilderView: React.FC<ScriptBuilderViewProps> = ({ onBackToHome }) => {
  const {
    activeVersion,
    updateNode,
    addNode,
    deleteNode,
    updatePlan,
    updateProof,
    updateQuickAnswer,
    publishNewVersion,
    exportScriptJson,
    importScriptJson,
    resetToDefaultScript
  } = useScript();

  const [activeTab, setActiveTab] = useState<'nodes' | 'plans' | 'proofs' | 'quickAnswers' | 'version'>('nodes');
  const [selectedStage, setSelectedStage] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNode, setEditingNode] = useState<ScriptNode | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [importText, setImportText] = useState('');
  const [newVersionName, setNewVersionName] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const stages: (ScriptStage | 'TODAS')[] = [
    'TODAS',
    'ABERTURA',
    'DIAGNÓSTICO',
    'DOR',
    'IMPLICAÇÃO',
    'OBJETIVO',
    'ACOMPANHAMENTO',
    'TRANSIÇÃO',
    'APRESENTAÇÃO',
    'RECOMENDAÇÃO',
    'PREÇO',
    'OBJEÇÕES',
    'FECHAMENTO',
    'EMERGÊNCIA'
  ];

  const filteredNodes = Object.values(activeVersion.nodes).filter(node => {
    const matchesStage = selectedStage === 'TODAS' || node.stage === selectedStage;
    const matchesQuery = !searchQuery.trim() || 
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.exactOperatorScript.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesQuery;
  });

  const handleEditClick = (node: ScriptNode) => {
    // Deep clone to prevent direct state mutation before saving
    setEditingNode(JSON.parse(JSON.stringify(node)));
    setIsCreatingNew(false);
  };

  const handleCreateNewClick = () => {
    const newNode: ScriptNode = {
      id: `node-${Date.now().toString(36)}`,
      stage: 'DIAGNÓSTICO',
      title: 'Novo Nó Conversacional',
      exactOperatorScript: 'Digite aqui a frase literal que o operador deve falar...',
      objective: 'Objetivo da fala...',
      tone: 'Curioso e acolhedor.',
      responses: [
        {
          id: `resp-1`,
          label: 'Resposta Sim',
          nextNodeId: 'node-abertura-principal',
          sentiment: 'positive',
          keyShortcut: '1'
        }
      ]
    };
    setEditingNode(newNode);
    setIsCreatingNew(true);
  };

  const handleSaveNode = () => {
    if (!editingNode) return;
    if (isCreatingNew) {
      addNode(editingNode);
      setStatusMessage('Novo nó criado com sucesso!');
    } else {
      updateNode(editingNode);
      setStatusMessage('Nó atualizado com sucesso!');
    }
    setEditingNode(null);
    setIsCreatingNew(false);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Node Editing Sub-handlers
  const handleAddResponse = () => {
    if (!editingNode) return;
    const newResp: ScriptResponse = {
      id: `resp-${Date.now().toString(36)}`,
      label: 'Nova Resposta',
      nextNodeId: editingNode.id,
      sentiment: 'neutral',
      keyShortcut: (editingNode.responses.length + 1).toString()
    };
    setEditingNode({
      ...editingNode,
      responses: [...editingNode.responses, newResp]
    });
  };

  const handleUpdateResponse = (index: number, updated: Partial<ScriptResponse>) => {
    if (!editingNode) return;
    const nextResponses = [...editingNode.responses];
    nextResponses[index] = { ...nextResponses[index], ...updated };
    setEditingNode({ ...editingNode, responses: nextResponses });
  };

  const handleDeleteResponse = (index: number) => {
    if (!editingNode) return;
    const nextResponses = editingNode.responses.filter((_, i) => i !== index);
    setEditingNode({ ...editingNode, responses: nextResponses });
  };

  const handleExport = () => {
    const json = exportScriptJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atlas_script_${activeVersion.versionName.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const success = importScriptJson(importText);
    if (success) {
      setStatusMessage('Script importado com sucesso!');
      setImportText('');
    } else {
      setStatusMessage('Erro ao importar JSON. Verifique a sintaxe.');
    }
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="min-h-screen w-screen bg-[#070A10] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="px-6 py-3.5 bg-[#0B0F17] border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Copilot</span>
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div>
            <h1 className="text-base font-bold text-white font-display flex items-center gap-2">
              <span>SCRIPT BUILDER</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-semibold">
                {activeVersion.versionName}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Editor visual e semântico da árvore de conversa da Atlas Academy
            </p>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          {statusMessage && (
            <span className="text-xs font-semibold text-emerald-400 px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 animate-pulse">
              {statusMessage}
            </span>
          )}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold"
            title="Exportar JSON da versão atual"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleCreateNewClick}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-display shadow-md shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Novo Nó</span>
          </button>
        </div>
      </header>

      {/* Builder Navigation Tabs */}
      <div className="px-6 bg-slate-950 border-b border-slate-800 flex items-center gap-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('nodes')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'nodes' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Árvore de Nós ({Object.keys(activeVersion.nodes).length})</span>
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'plans' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Planos & Preços ({activeVersion.plans.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('proofs')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'proofs' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Provas Comerciais ({activeVersion.proofs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('quickAnswers')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'quickAnswers' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Perguntas Rápidas ({activeVersion.quickAnswers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('version')}
          className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'version' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Versionamento & JSON</span>
        </button>
      </div>

      {/* Main Body */}
      <main className="flex-1 overflow-hidden flex">
        {/* TAB 1: NODES TREE */}
        {activeTab === 'nodes' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Column: Filter & List */}
            <div className="w-96 border-r border-slate-800 bg-[#0A0E17] flex flex-col h-full shrink-0">
              <div className="p-3.5 border-b border-slate-800 space-y-2.5">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar nós por ID, fala..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Stage Filter */}
                <div className="flex gap-1 overflow-x-auto pb-1 text-[11px]">
                  {stages.map(stg => (
                    <button
                      key={stg}
                      onClick={() => setSelectedStage(stg)}
                      className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                        selectedStage === stg
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nodes List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {filteredNodes.map(node => (
                  <div
                    key={node.id}
                    onClick={() => handleEditClick(node)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      editingNode?.id === node.id
                        ? 'bg-amber-500/10 border-amber-500/80 shadow-md'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-amber-400/90 truncate max-w-[180px]">
                        {node.id}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {node.stage}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate mb-1">
                      {node.title}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-2 italic mb-2">
                      “{node.exactOperatorScript}”
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-800/60">
                      <span>{node.responses.length} saídas configuradas</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Node Visual Card / Editor */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#070A10]">
              {editingNode ? (
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Header of editing node */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400">{editingNode.id}</span>
                      <h2 className="text-xl font-bold text-white font-display">
                        {isCreatingNew ? 'Novo Nó Conversacional' : `Editar Nó: ${editingNode.title}`}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isCreatingNew && (
                        <button
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja excluir o nó ${editingNode.id}?`)) {
                              deleteNode(editingNode.id);
                              setEditingNode(null);
                            }
                          }}
                          className="p-2 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900 border border-rose-800/60 text-xs font-semibold"
                          title="Excluir Nó"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={handleSaveNode}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-display shadow-md shadow-amber-500/20"
                      >
                        <Save className="w-4 h-4" />
                        <span>Salvar Alterações</span>
                      </button>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Título do Nó:</label>
                      <input
                        type="text"
                        value={editingNode.title}
                        onChange={e => setEditingNode({ ...editingNode, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Etapa:</label>
                      <select
                        value={editingNode.stage}
                        onChange={e => setEditingNode({ ...editingNode, stage: e.target.value as ScriptStage })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                      >
                        {stages.filter(s => s !== 'TODAS').map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Exact Operator Script */}
                  <div>
                    <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                      FALE EXATAMENTE ISSO (Script Literal):
                    </label>
                    <textarea
                      value={editingNode.exactOperatorScript}
                      onChange={e => setEditingNode({ ...editingNode, exactOperatorScript: e.target.value })}
                      rows={4}
                      className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-sans leading-relaxed focus:border-amber-400 focus:outline-none"
                    />
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Placeholders disponíveis: <code className="text-amber-300">{"{{nome}}"}</code>, <code className="text-amber-300">{"{{operador}}"}</code>, <code className="text-amber-300">{"{{dor}}"}</code>, <code className="text-amber-300">{"{{objetivo}}"}</code>, <code className="text-amber-300">{"{{plano}}"}</code>, <code className="text-amber-300">{"{{preco}}"}</code>.
                    </span>
                  </div>

                  {/* Short & Alternative Scripts */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Versão Curta (Opcional):</label>
                      <textarea
                        value={editingNode.shortScript || ''}
                        onChange={e => setEditingNode({ ...editingNode, shortScript: e.target.value })}
                        rows={2}
                        placeholder="Para quando o lead está com pressa..."
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Versão Alternativa (Opcional):</label>
                      <textarea
                        value={editingNode.alternativeScript || ''}
                        onChange={e => setEditingNode({ ...editingNode, alternativeScript: e.target.value })}
                        rows={2}
                        placeholder="Outra forma de formular a mesma pergunta..."
                        className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Tone, Objective & Instruction */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Tonalidade:</label>
                      <input
                        type="text"
                        value={editingNode.tone}
                        onChange={e => setEditingNode({ ...editingNode, tone: e.target.value })}
                        placeholder="Ex: Curioso e calmo"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Objetivo:</label>
                      <input
                        type="text"
                        value={editingNode.objective}
                        onChange={e => setEditingNode({ ...editingNode, objective: e.target.value })}
                        placeholder="Ex: Identificar maior dor"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-amber-400 mb-1">Comando / Instrução Interna:</label>
                      <input
                        type="text"
                        value={editingNode.instruction || ''}
                        onChange={e => setEditingNode({ ...editingNode, instruction: e.target.value })}
                        placeholder="Ex: [PARE DE FALAR E ESPERE]"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-200 text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* RESPONSES SECTION (OUTLETS) */}
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display">
                        Respostas do Lead & Próximos Nós (Saídas)
                      </h3>
                      <button
                        onClick={handleAddResponse}
                        className="flex items-center gap-1 text-xs text-amber-400 font-semibold hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" /> Adicionar Resposta
                      </button>
                    </div>

                    <div className="space-y-3">
                      {editingNode.responses.map((resp, idx) => (
                        <div key={resp.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-amber-400">
                              Atalho: [{resp.keyShortcut || idx + 1}]
                            </span>
                            <button
                              onClick={() => handleDeleteResponse(idx)}
                              className="text-slate-500 hover:text-rose-400 text-xs"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Texto do Botão:</label>
                              <input
                                type="text"
                                value={resp.label}
                                onChange={e => handleUpdateResponse(idx, { label: e.target.value })}
                                className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">Próximo Nó (Destino):</label>
                              <select
                                value={resp.nextNodeId}
                                onChange={e => handleUpdateResponse(idx, { nextNodeId: e.target.value })}
                                className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-amber-300 text-xs focus:border-amber-400 focus:outline-none font-mono"
                              >
                                {Object.values(activeVersion.nodes).map(n => (
                                  <option key={n.id} value={n.id}>
                                    {n.id} — {n.stage} ({n.title})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500">
                  <GitBranch className="w-12 h-12 mb-3 text-slate-700" />
                  <div className="text-sm font-semibold text-slate-300">Nenhum nó selecionado</div>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Selecione um nó da lista à esquerda para editar a fala, respostas e conexões da conversa.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PLANS */}
        {activeTab === 'plans' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white font-display">Planos Comerciais da Atlas Academy</h2>
              <p className="text-xs text-slate-400">Edite valores, cadência de encontros e instruções de pagamento.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeVersion.plans.map(p => (
                <div key={p.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base">{p.name}</span>
                    <input
                      type="text"
                      value={p.price}
                      onChange={e => updatePlan({ ...p, price: e.target.value })}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-amber-400 font-bold text-xs text-right focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Encontros Semanais:</label>
                    <input
                      type="text"
                      value={p.meetings}
                      onChange={e => updatePlan({ ...p, meetings: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Instruções de Pagamento:</label>
                    <textarea
                      value={p.paymentInstructions || ''}
                      onChange={e => updatePlan({ ...p, paymentInstructions: e.target.value })}
                      rows={2}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROOFS */}
        {activeTab === 'proofs' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white font-display">Provas Comerciais Documentadas</h2>
              <p className="text-xs text-slate-400">
                Evidências e métricas auditadas da empresa citadas durante as objeções.
              </p>
            </div>

            <div className="space-y-4">
              {activeVersion.proofs.map(pf => (
                <div key={pf.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-sm">{pf.title}</span>
                    <input
                      type="text"
                      value={pf.statOrFact}
                      onChange={e => updateProof({ ...pf, statOrFact: e.target.value })}
                      className="px-3 py-1 rounded bg-slate-950 border border-slate-700 text-white font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Frase que o operador lê:</label>
                    <textarea
                      value={pf.speechText}
                      onChange={e => updateProof({ ...pf, speechText: e.target.value })}
                      rows={2}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUICK ANSWERS */}
        {activeTab === 'quickAnswers' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white font-display">Respostas Rápidas (Fez Uma Pergunta)</h2>
              <p className="text-xs text-slate-400">Respostas exatas para perguntas inesperadas dos leads.</p>
            </div>

            <div className="space-y-4">
              {activeVersion.quickAnswers.map(qa => (
                <div key={qa.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{qa.questionSnippet}</span>
                    <span className="text-[10px] uppercase font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-950">
                      {qa.category}
                    </span>
                  </div>
                  <textarea
                    value={qa.exactAnswerScript}
                    onChange={e => updateQuickAnswer({ ...qa, exactAnswerScript: e.target.value })}
                    rows={2}
                    className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: VERSIONING & JSON */}
        {activeTab === 'version' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white font-display">Versionamento & Importação JSON</h2>
              <p className="text-xs text-slate-400">
                Gerencie versões publicadas do script. Novas chamadas usarão a versão ativa mais recente.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Publicar Nova Versão</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newVersionName}
                  onChange={e => setNewVersionName(e.target.value)}
                  placeholder="Ex: Script v1.1 — Ajuste no diagnóstico de cripto"
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => {
                    if (newVersionName.trim()) {
                      publishNewVersion(newVersionName.trim());
                      setNewVersionName('');
                      setStatusMessage('Nova versão publicada!');
                      setTimeout(() => setStatusMessage(null), 3000);
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Publicar Versão
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white">Importar JSON de Script</h3>
              <textarea
                value={importText}
                onChange={e => setImportText(e.target.value)}
                placeholder="Cole o JSON completo do script aqui..."
                rows={6}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none"
              />
              <div className="flex justify-between items-center">
                <button
                  onClick={resetToDefaultScript}
                  className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Resetar para Script Oficial v1
                </button>
                <button
                  onClick={handleImport}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Importar JSON
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
