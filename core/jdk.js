//refrence from jQuery
(function(win,undefined){
    var isDebug=/debug/i.test(win.location.hash),
        /**
         *���� ���еĳ�Ա
         */
        hasOwn = Object.prototype.hasOwnProperty, 
        Util={
            /**
             * ��չ����Ԫ��
             * @param {Object} originObj ԭʼ����
             * @param {Object} newObj   �¶���
             * @param {Boolean} isOverride  [option][default=true]�Ƿ񸲸����ж���
             * @param {Array} selectedProperty [option]�����б�
             */
            extends:function(originObj, newObj, isOverride,selectedProperty){
                var p,item;
                originObj=originObj||{};
                if(!newObj){
                    return;
                }
                
                if(isOverride instanceof Array){
                    selectedProperty=isOverride;
                    isOverride=true;
                }
                if(isOverride===undefined){
                    isOverride=true;
                }
                if(selectedProperty && (p=selectedProperty.length)){
                    while(p--){
                        item=selectedProperty[p];
                        if(hasOwn.call(newObj,item)){
                            (isOverride||!originObj[item]) && (originObj[item]= newObj[item]);
                        }
                    }
                }else{
                    for ( p in newObj) {
                        if (hasOwn.call(newObj, p)) {
                            (isOverride||!originObj[p]) && (originObj[p]= newObj[p]);
                        }
                    }
                }
                return originObj;
                
            },
            /**
             *�������еĳ�Ա 
             */
            eachProp:function(obj,callback){
                var i,len;
                switch(typeof obj){
                    case 'array':
                        for(i=0,len=obj.length;i<len;i++){
                            callback&&callback(i,obj);
                        }
                        break;
                    case 'object':
                        for(i in obj){
                            if(hasOwn.call(obj,i)){
                                callback&&callback(i,obj[i]);
                            }
                        }
                        break;
                    default:
                        break;
                }
            },
            /**
             *��ȡԪ��byid 
             */
            getDom:function(id){
                if(id==='body'){
                    return document.body;
                }
                return document.getElementById(id);
            },
            /**
             *����һ��Ԫ�� 
             */
            createDom:function(tagname,prop){
              var _dom= document.createElement(tagname);
              if(prop){
                  this.eachProp(prop,function(p,value){
                      if(p=='html'){
                          _dom.innerHTML=value;
                      }else{
                          _dom.setAttribute(p,value);
                      }
                  });
              }
              return _dom;  
            },
            log:function(p){
                var html,body;
                if(!isDebug){
                    return;
                }
                if(typeof console !== 'undefined' && console.log){
                    console.log(p);
                }else{
                    html = this.getDom('class-logging');
                    body=this.getDom('body');
                    //alert(html);
                    if (!html) {
                        html = this.createDom('div',{
                            "id":"class-logging",
                            "html":'<h3>Debug Results:</h3><ol id="class-debug-list"></ol>'
                        });
                        body.insertBefore(html,body.firstChild);
                    }
                    ol = this.getDom('debug-list');
                    ol.innerHTML = ol.innerHTML + '<li>' + p + '</li>';
                }
            }
        },
        //������ͽӿڹ���������Դ
        dataSource={
            "classes":{
                //����Ϊ�����ռ�
                "__type__":'namespace',
                "namespace":{
                    "__type__":'namespace',
                    "_______eg":{
                        /**
                         *���������ڵ������ռ� 
                         */
                        'classPath':'namespace/myclass',
                        /**
                         *class������ 
                         */
                        '__type__':'class',
                        'static':{
                            
                        },
                        //˽�з���
                        'private':{
                            
                        },
                        /**
                         *�ܱ����ķ��� 
                         */
                        'protected':{
                            
                        },
                        /**
                         *�������� 
                         */
                        'public':{
                            
                        },
                        /**
                         *�̳��б� 
                         */
                        'superClassList':[
                            'namespace/class2',
                            'namespace/class3'
                        ],
                        /**
                         *ʵ�ֵĽӿ��б� 
                         */
                        'interfaceList':[
                            'namespace/interface1',
                            'namespace/interface2'
                        ]
                    }   
                }
            },
            "interfaces":{
                "__type__":'namespace',
                "namespace":{
                    "__type__":'namespace',
                    "______eg":{
                        interfacePath:'namespace/interface1',
                        /**
                         *��class������ 
                         */
                        '__type__':'interface',
                        //˽�з���
                        'private':{
                            
                        },
                        /**
                         *�ܱ����ķ��� 
                         */
                        'protected':{
                            
                        },
                        /**
                         *�������� 
                         */
                        'public':{
                            
                        }
                    }
                }
            }
        },
        /**
         *class��صĹ�����֧�� 
         */
        DataUtil={
            /**
             *��ȡ�����ռ� 
             * @param {string} path the path of class or interface
             * @param {string} type class/interface
             */
            getNameSpace:function(path,type){
                var patharray=path.split('\/'),
                    i,
                    len=patharray.length,
                    result={
                        name:'',
                        namespace:null
                    },
                    type=type=='interface'?'interfaces':'classes';
                  
                if(len<1){
                    Util.log('please input the right path of classname!');
                    return null;
                }else{
                    result['classname']=patharray[len-1];
                    result['namespace']=dataSource[type];
                    for(i=0;i<len-1;i++){
                        result['namespace']=result['namespace'][patharray[i]]=result['namespace'][patharray[i]]||{
                            '__type__':'namespace'
                         };
                    }
                    if(result['namespace'].__type__!=='namespace'){
                        Util.log('sorry,you can not declare the class under another class!');
                        return null;
                    }
                    switch(returntype){
                        case 'class'://ֱ�ӷ��ظ��������
                            return result['namespace'][result['name']];
                            break;
                        default://Ĭ�Ϸ��ؽ���б�
                            return result;
                            break;
                    }
                    
                }
            },
            getClass:function(classpath){
                var nsp=this.getNameSpace(classpath,'class');
                return nsp['namespace'][nsp['name']];
            },
            /**
             *������һ��Class 
             */
            addNewClass:function(obj){
                var namesp=this.getNameSpace(obj.classPath,'class');
                if(namesp){
                    obj.__type__='class';
                    namesp['namespace'][namesp['name']]=obj;
                    return true;
                }else{
                    return false;
                }
                
            },
            getInterface:function(classpath){
                var nsp=this.getNameSpace(classpath,'interface');
                return nsp['namespace'][nsp['name']];
            },
            addNewInterface:function(obj){
                var namesp=this.getNameSpace(obj.classPath,'interface');
                if(namesp){
                    obj.__type__='interface';
                    namesp['namespace'][namesp['name']]=obj;
                    return true;
                }else{
                    return false;
                }
            }
        };
    /**
     *�๹����  ��Ŀǰ��֧��__static���ͣ�������������������
     * @param {String} classname eg:'trade/view'��ʾ�����trade�����ռ��µ�view��
     * @param {Object} obj {prop1:null,prop2__static:null} ����Ǿ�̬���Ժ���������__static��Ϊ��ʾ��
     */
    function Class(classname,obj){
        //��Ҫ�����ϲ��Class
        if(!(this instanceof Class)){
            return new Class(classname,obj);
        }
        var _class={
            'classPath':classname,
            'static':{},
            'private':{},
            'protected':{},
            'public':{},
            'superClassList':[],
            'interfaceList':[]
        },
        _this=this;
        
        Util.eachProp(obj,function(p,value){
            var type=p.match(/^(?:(static)__)?(?:(public|private|protected)__)?([^__]+)$/);
            //�������������
            if(type){
                //Ĭ��public
                type[2]=type[2]||'public';
                if(type[1]){//staticֱ�Ӹ�ֵ�����Class��
                    _this[type[3]]=value;
                    _class[type[1]][type[3]]=value;
                }else if(type[2]){
                    _class[type[2]][type[3]]=value;
                }
            }else{
                Util.log('the property "'+p+'" is not an invalid name as "public__getoffername"!');
                return;
            }
        });
        DataUtil.addNewClass(_class);
        this.getClassPath=function(){
          return classname;  
        };
    }
    
    /**
     *����ӿ� 
     */
    function Interface(interfaceName,obj){
        if(! (this instanceof Interface)){
            return new Interface(obj);
        }
        var _interface={
            'interfacePath':interfaceName,
            'static':{},
            'private':{},
            'protected':{},
            'public':{}
        };
        
        Util.eachProp(obj,function(p,value){
            var type=p.match(/^(?:(static)__)?(?:(public|private|protected)__)?([^__]+)$/);
            //�������������
            if(type){
                type[2]=type[2]||'public';
                if(type[1]){//staticֱ�Ӹ�ֵ�����Class��
                    _class[type[1]][type[3]]=value;
                }else if(type[2]){
                    _class[type[2]][type[3]]=value;
                }
            }else{
                Util.log('the property "'+p+'" is not an invalid name as "public__getoffername"!');
                return;
            }
        });
        DataUtil.addInterface(_interface);
        this.getInterfacePath=function(){
          return interfaceName;  
        };
    }
    //��չClass
    Util.extends(Class.prototype,{
            /**
             * ��superClass�̳����Ժͷ���,ֻ�ܼ̳�superClass�Ĺ���static����
             * @param {Class} superClass
             */
           extends:function(superClass){
               var clsp,_class;
               if(superClass instanceof Class){
                   clsp=this.getClassPath();
                   _class=DataUtil.getClass(clsp);
                   _class.superClassList.push(superClass.getClassPath());
               }else{
                   Util.log('the '+superClass+' isn\'t an invalid Class during extends');
               }
               return this;
           },
           /**
            *ʵ�ֽӿ� 
            * @param {Interface} superClass
            * @param {Object} methods {method:function(){}}
            */
           implements:function(pinterface){
               if(pinterface&&pinterface.isInterface()){
                   
               }else{
                   Util.log('the '+pinterface+' isn\'t an invalid Interface during implements');
               }
               return this;
           },
           /**
            *�ж��Ƿ�̳��� 
            * @param {Class} superClass
            */
           isExtendsFrom:function(superClass){
               var clsp=this.getClassPath(),
                    _class=DataUtil.getClass(clsp);
                return _class.superClassList.indexOf(superClass)>-1;
           },
           /**
            *�ж��Ƿ�ʵ����ĳ���ӿ� 
            * @param {Interface} pInterface
            */
           isImplements:function(pInterface){
               var clsp=this.getClassPath(),
                    _class=DataUtil.getClass(clsp);
                return _class.interfaceList.indexOf(superClass)>-1;
           },
           /**
            *ʵ��������� 
            */
           createInstance:function(){
               
           }
        },
        true
    );
    //���ص�ȫ�ֱ���
    Util.extends(window,{
           //���⹫��ΪJDK
           "JDK":{
                "Util":Util,
                "Class":Class,
                "Interface":Interface
               }
        },
        true,
        ['JDK']
    );
})(window,undefined);