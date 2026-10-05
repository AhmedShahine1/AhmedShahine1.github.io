const KEY='ahmed-os-fixed-v2';
const plans={
0:[['ML / AI',90,'ml'],['Software Engineering',90,'software'],['Postgraduate Diploma',60,'diploma'],['English & Communication',30,'language'],['Reading & Soft Skills',30,'reading']],
1:[['ML / AI',90,'ml'],['Software Engineering',60,'software'],['Postgraduate Diploma',60,'diploma'],['English & Communication',60,'language'],['Quran / Personal',30,'quran']],
2:[['ML / AI',90,'ml'],['Software Engineering',60,'software'],['Postgraduate Diploma',60,'diploma'],['English & Communication',30,'language'],['Reading & Soft Skills',30,'reading'],['Quran / Personal',30,'quran']],
3:[['ML / AI',90,'ml'],['Software Engineering',60,'software'],['Postgraduate Diploma',60,'diploma'],['English & Communication',60,'language'],['Quran / Personal',30,'quran']],
4:[['ML / AI',60,'ml'],['Software Engineering',60,'software'],['Postgraduate Diploma',60,'diploma'],['English & Communication',60,'language'],['Reading & Soft Skills',30,'reading'],['Quran / Personal',30,'quran']],
5:[['ML / AI',60,'ml'],['Software Engineering',30,'software'],['English & Communication',30,'language'],['Reading & Soft Skills',90,'reading'],['Quran / Personal',90,'quran']],
6:[['ML / AI',120,'ml'],['Software Engineering',60,'software'],['Postgraduate Diploma',60,'diploma'],['English & Communication',30,'language'],['Quran / Personal',30,'quran']]
};
const targets={ml:['ML → AI',600],software:['Software',420],diploma:['Diploma',360],language:['Language',300],reading:['Reading',180],quran:['Quran',240]};
const localKey=(d=new Date())=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
function state(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return{}}}function save(x){localStorage.setItem(KEY,JSON.stringify(x))}
function todayPlan(){return plans[new Date().getDay()]}
function toggle(i){const s=state(),k=localKey(),d=s[k]||{done:[],physical:false};d.done=d.done.includes(i)?d.done.filter(x=>x!==i):[...d.done,i];s[k]=d;save(s);render()}
function togglePhysical(){const s=state(),k=localKey(),d=s[k]||{done:[],physical:false};d.physical=!d.physical;s[k]=d;save(s);render()}
function weekStart(){const d=new Date(),n=d.getDay(),back=(n+1)%7;d.setHours(0,0,0,0);d.setDate(d.getDate()-back);return d}
function completedByTrack(){const out={ml:0,software:0,diploma:0,language:0,reading:0,quran:0},s=state(),start=weekStart();for(let n=0;n<7;n++){const d=new Date(start);d.setDate(start.getDate()+n);const rec=s[localKey(d)]||{done:[]};(rec.done||[]).forEach(i=>{const task=plans[d.getDay()][i];if(task)out[task[2]]+=task[1]})}return out}
function render(){const s=state(),k=localKey(),d=s[k]||{done:[],physical:false},p=todayPlan();document.querySelector('#todayTasks').innerHTML=p.map((t,i)=>'<article class="task '+(d.done.includes(i)?'done':'')+'"><button onclick="toggle('+i+')">'+(d.done.includes(i)?'✓':'○')+'</button><div><h3>'+t[0]+'</h3><p>Fixed '+t[1]+' minute block</p></div><span>'+Math.floor(t[1]/60)+'h '+(t[1]%60?t[1]%60+'m':'')+'</span></article>').join('');const devDone=d.done.reduce((a,i)=>a+(p[i]?.[1]||0),0);document.querySelector('#done').textContent=Math.round(devDone/300*100)+'%';const pb=document.querySelector('#physicalBtn');pb.textContent=d.physical?'✓ Completed':'Mark complete';pb.classList.toggle('complete',!!d.physical);const done=completedByTrack();document.querySelector('#weekGrid').innerHTML=Object.entries(targets).map(([k,v])=>'<article><small>'+v[0]+'</small><b>'+v[1]/60+'h</b><span>'+ (done[k]/60).toFixed(1)+'h done</span></article>').join('');document.querySelector('#weekProgress').innerHTML=Object.entries(targets).map(([k,v])=>'<div><header><span>'+v[0]+'</span><span>'+(done[k]/60).toFixed(1)+' / '+v[1]/60+'h</span></header><i><b style="width:'+Math.min(100,done[k]/v[1]*100)+'%"></b></i></div>').join('')}
document.querySelector('#date').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'});document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button,.pane').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelector('#'+b.dataset.tab).classList.add('active')});render();
const ROADMAP_KEY='ahmed-os-roadmap-v1';
const roadmaps={
 ml:[
  {name:'Python Fundamentals',status:'completed',topics:['Syntax & control flow','Functions & modules','Collections','OOP basics','Exceptions & files'],project:'Python fundamentals exercises'},
  {name:'NumPy',topics:['ndarray, shape & dtype','Indexing & slicing','Vectorization','Broadcasting','Axis & aggregations','Reshape & transpose','Random module','Linear algebra basics'],project:'Numerical analysis mini-project'},
  {name:'Pandas',topics:['Series & DataFrame','Filtering & selection','Missing values & duplicates','GroupBy & aggregation','Merge / join','Sorting','Datetime & categorical data','CSV / Excel I/O'],project:'Clean and analyze a real dataset'},
  {name:'Visualization & EDA',topics:['Matplotlib fundamentals','Histograms & distributions','Scatter / correlation','Box plots & outliers','EDA workflow','Communicating findings'],project:'EDA report with insights'},
  {name:'Math for ML',topics:['Linear algebra','Vectors & matrices','Calculus & gradients','Probability','Statistics','Distributions & hypothesis intuition'],project:'Math-for-ML notebook'},
  {name:'Machine Learning',topics:['Linear regression','Logistic regression','Model evaluation','Bias & variance','Feature engineering','Decision trees','Random forests & boosting','Clustering','Anomaly detection','Recommender systems'],project:'End-to-end supervised ML project'},
  {name:'ML Engineering',topics:['scikit-learn pipelines','Cross-validation','Hyperparameter tuning','Data leakage','Experiment tracking','Model serialization','API serving'],project:'Production-ready ML API'},
  {name:'Deep Learning & PyTorch',topics:['Neural networks','Backpropagation','PyTorch tensors','Training loops','Optimization','CNNs','Sequence models','Transformers foundations'],project:'PyTorch deep-learning project'},
  {name:'LLMs & GenAI',topics:['Transformer architecture','Tokenization','Embeddings','Prompting','Fine-tuning concepts','LLM evaluation'],project:'LLM application'},
  {name:'RAG & AI Engineering',topics:['Vector databases','Chunking','Retrieval','Reranking','RAG evaluation','Tool calling','Agents','Structured outputs','MCP'],project:'RAG + tools application'},
  {name:'MLOps',topics:['FastAPI','Docker','MLflow','CI/CD for ML','Model monitoring','Data/model drift','Cloud deployment'],project:'Deploy and monitor an ML system'},
  {name:'Production AI Systems',topics:['.NET integration','Angular AI UX','Async AI workflows','Caching & queues','Observability','Security & cost control'],project:'Full .NET + Angular + Python AI system'}
 ],
 software:[
  {name:'System Design',topics:['Requirements & constraints','Capacity estimation','API design','Data modeling','Caching','Queues','Scaling','Consistency','Reliability','Observability'],project:'Design 3 production systems'},
  {name:'Advanced .NET / C#',topics:['CLR internals','GC & memory','async/await internals','Tasks & threading','Span & Memory','DI internals','ASP.NET Core pipeline','Kestrel','EF Core performance'],project:'Profile and optimize a .NET service'},
  {name:'Database Internals',topics:['Execution plans','Indexes','Transactions','Isolation levels','Locking & deadlocks','Optimistic concurrency','Query optimization','Partitioning & replication'],project:'Database performance case study'},
  {name:'Distributed Systems',topics:['CAP & consistency','Idempotency','Retries & backoff','Eventual consistency','Outbox / Inbox','Saga','Delivery semantics','Distributed locking'],project:'Reliable event-driven workflow'},
  {name:'Cloud / DevOps / Observability',topics:['Docker depth','AWS or Azure','CI/CD','Logging','Metrics','Tracing','OpenTelemetry','Deployment strategies'],project:'Deploy and observe a production service'}
 ]};
function roadmapState(){try{return JSON.parse(localStorage.getItem(ROADMAP_KEY)||'{}')}catch{return{}}}
function saveRoadmap(x){localStorage.setItem(ROADMAP_KEY,JSON.stringify(x))}
function topicDone(track,stage,i){const rs=roadmapState();return !!rs[track+'-'+stage+'-'+i]}
function toggleTopic(track,stage,i){const rs=roadmapState(),k=track+'-'+stage+'-'+i;rs[k]=!rs[k];rs[k+'-date']=rs[k]?Date.now():null;rs[k+'-mastery']=rs[k]?'learned':null;saveRoadmap(rs);renderRoadmaps();renderNextActions();renderReviews();renderProjects()}
function cycleMastery(track,stage,i){const rs=roadmapState(),k=track+'-'+stage+'-'+i+'-mastery',levels=['learned','practiced','explain','build'];let n=Math.max(0,levels.indexOf(rs[k]));rs[k]=levels[(n+1)%levels.length];saveRoadmap(rs);renderRoadmaps()}
function mastery(track,stage,i){const rs=roadmapState();return rs[track+'-'+stage+'-'+i+'-mastery']||'learned'}
function stageProgress(track,stage){const x=roadmaps[track][stage];if(x.status==='completed')return 100;return Math.round(x.topics.filter((_,i)=>topicDone(track,stage,i)).length/x.topics.length*100)}
function currentStage(track){const a=roadmaps[track];for(let i=0;i<a.length;i++)if(stageProgress(track,i)<100)return i;return a.length-1}
function renderTrack(track,id){const cur=currentStage(track);document.querySelector(id).innerHTML=roadmaps[track].map((x,si)=>{const p=stageProgress(track,si),state=p===100?'completed':si===cur?'current':'locked';return '<article class="road-stage '+state+'"><div class="stage-top"><span class="stage-num">'+String(si+1).padStart(2,'0')+'</span><div><h4>'+x.name+'</h4><small>'+(p===100?'COMPLETED':si===cur?'CURRENT FOCUS':'UP NEXT')+' · '+p+'%</small></div><b>'+p+'%</b></div><i class="stage-bar"><u style="width:'+p+'%"></u></i><div class="topic-list">'+x.topics.map((t,i)=>'<button class="'+(topicDone(track,si,i)||x.status==='completed'?'done':'')+'" onclick="toggleTopic(\''+track+'\','+si+','+i+')">'+((topicDone(track,si,i)||x.status==='completed')?'✓':'○')+' '+t+'</button><button class="mastery" onclick="cycleMastery(\''+track+'\','+si+','+i+')">'+(topicDone(track,si,i)?mastery(track,si,i):'not started')+'</button>').join('')+'</div><div class="milestone"><small>MILESTONE</small><span>'+x.project+'</span></div></article>'}).join('')}
function nextTopic(track){const si=currentStage(track),x=roadmaps[track][si];if(x.status==='completed')return {stage:x.name,topic:'Completed'};const i=x.topics.findIndex((_,i)=>!topicDone(track,si,i));return {stage:x.name,topic:x.topics[i]||x.project}}
function renderRoadmaps(){renderTrack('ml','#mlRoadmap');renderTrack('software','#softwareRoadmap');const m=nextTopic('ml'),sw=nextTopic('software');document.querySelector('#focusCards').innerHTML='<article><small>ML / AI · CURRENT</small><h3>'+m.stage+'</h3><p>Next: <b>'+m.topic+'</b></p><span>10h / week</span></article><article><small>SOFTWARE · CURRENT</small><h3>'+sw.stage+'</h3><p>Next: <b>'+sw.topic+'</b></p><span>7h / week</span></article>'}
renderRoadmaps();
const RESOURCES={
 'ml-1':['NumPy official Quickstart','Practice: array/vectorization exercises','Milestone: numerical analysis notebook'],
 'ml-2':['Pandas official Getting Started','Practice: data cleaning exercises','Milestone: real dataset analysis'],
 'ml-3':['Matplotlib tutorials','EDA checklist + practice dataset','Milestone: insight report'],
 'ml-4':['Mathematics for ML & Data Science','Math notebooks and exercises'],
 'ml-5':['Andrew Ng Machine Learning Specialization','scikit-learn practice','End-to-end ML project'],
 'software-0':['System Design fundamentals','Design interview practice','Milestone: 3 system designs'],
 'software-1':['C#/.NET internals study','Runtime and performance experiments','Milestone: optimize a .NET service']
};
function renderNextActions(){const box=document.querySelector('#nextActions');if(!box)return;const m=nextTopic('ml'),sw=nextTopic('software');box.innerHTML='<article><small>NEXT ML ACTION</small><b>'+m.stage+'</b><span>'+m.topic+'</span><em>Use your ML/AI block</em></article><article><small>NEXT SOFTWARE ACTION</small><b>'+sw.stage+'</b><span>'+sw.topic+'</span><em>Use your Software block</em></article>'}
function renderProjects(){const box=document.querySelector('#projectPipeline');if(!box)return;const items=[];Object.entries(roadmaps).forEach(([track,arr])=>arr.forEach((x,i)=>items.push({track,name:x.project,stage:x.name,p:stageProgress(track,i)})));box.innerHTML=items.map(x=>'<article class="project-card"><small>'+x.track.toUpperCase()+' · '+x.stage+'</small><h3>'+x.name+'</h3><span class="project-status">'+(x.p===100?'READY TO BUILD':x.p>0?'PREPARING':'PLANNED')+'</span></article>').join('')}
function renderReviews(){const box=document.querySelector('#reviewQueue');if(!box)return;const rs=roadmapState(),now=Date.now(),due=[];Object.entries(roadmaps).forEach(([track,arr])=>arr.forEach((x,si)=>x.topics.forEach((t,i)=>{const k=track+'-'+si+'-'+i;if(!rs[k]||!rs[k+'-date'])return;const days=Math.floor((now-rs[k+'-date'])/86400000);const cycle=days>=30?'30-day':days>=7?'7-day':days>=1?'1-day':null;if(cycle)due.push({track,t,cycle,stage:x.name})})));box.innerHTML=due.length?due.map(x=>'<article><small>'+x.cycle+' REVIEW · '+x.track.toUpperCase()+'</small><b>'+x.t+'</b><span>'+x.stage+'</span></article>').join(''):'<div class="empty-state">Nothing due right now. Complete topics and they will return here for spaced review.</div>'}
function renderResources(){document.querySelectorAll('.road-stage').forEach((el)=>{});}
renderNextActions();renderProjects();renderReviews();
