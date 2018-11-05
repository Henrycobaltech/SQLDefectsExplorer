import React, { Component } from 'react';
import { CssBaseline, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@material-ui/core';
import './GitHub.css';

const drawerWidth = 350;
const a = [{
    "_id" : "5bd18c5dff0c64ead7ea442c",
    "ques_title" : "What is a tensorflow float ref?",
    "ques_body" : "<p>Trying to run the following basic example to run a conditional calculation I got the following error message:</p>\n\n<blockquote>\n  <p>'x' was passed float incompatible with expected float_ref</p>\n</blockquote>\n\n<p>what is a tensorflow float_ref and how does the code have to be modified?</p>\n\n<pre><code>import tensorflow as tf\nfrom tensorflow.python.ops.control_flow_ops import cond\n\na = tf.Variable(tf.constant(0.),name=\"a\")\nb = tf.Variable(tf.constant(0.),name=\"b\")\nx = tf.Variable(tf.constant(0.),name=\"x\")\n\ndef add():\n    x.assign( a + b)\n    return x\n\ndef last():\n    return x\n\ncalculate= cond(x==0.,add,last)\n\nwith tf.Session() as s:\n    val = s.run([calculate], {a: 1., b: 2., x: 0.})\n    print(val) # 3\n    val=s.run([calculate],{a:4.,b:5.,x:val})\n    print(val) # 3\n</code></pre>\n",
    "Tags" : [
        "python",
        "tensorflow"
    ],
    "ques_score" : "5",
    "ques_favoriate" : 1,
    "ques_creation_date" : "2015-12-14 11:21:11",
    "ques_closed_date" : "",
    "ans_body" : "<p>this doesn't explain what a float_ref is, but it fixes the issues:</p>\n\n<p>1) variables need to be created in the session\n2) assignment op was not what we expected</p>\n\n<p>this fixed code works:</p>\n\n<pre><code>def add():\n    print(\"add\")\n    x = a + b\n    return x\n\ndef last():\n    print(\"last\")\n    return x\n\nwith tf.Session() as s:\n    a = tf.Variable(tf.constant(0.),name=\"a\")\n    b = tf.Variable(tf.constant(0.),name=\"b\")\n    x = tf.constant(-1.)\n    calculate= cond(x.eval()==-1.,add,last)\n    val = s.run([calculate], {a: 1., b: 2.})\n    print(val) # 3\n    print(s.run([calculate],{a:3.,b:4.})) # 7\n    print(val) # 3\n</code></pre>\n",
    "ans_score" : "2",
    "ans_favorite" : 0,
    "ans_create_date" : "2015-12-14 14:22:21",
    "ans_last_edit_date" : "",
    "ViewCount" : 3166,
    "upvote" : 5,
    "downvote" : 0,
    "ques_code" : [
        "import tensorflow as tf\nfrom tensorflow.python.ops.control_flow_ops import cond\n\na = tf.Variable(tf.constant(0.),name=\"a\")\nb = tf.Variable(tf.constant(0.),name=\"b\")\nx = tf.Variable(tf.constant(0.),name=\"x\")\n\ndef add():\n    x.assign( a + b)\n    return x\n\ndef last():\n    return x\n\ncalculate= cond(x==0.,add,last)\n\nwith tf.Session() as s:\n    val = s.run([calculate], {a: 1., b: 2., x: 0.})\n    print(val) # 3\n    val=s.run([calculate],{a:4.,b:5.,x:val})\n    print(val) # 3\n"
    ],
    "ans_code" : [
        "def add():\n    print(\"add\")\n    x = a + b\n    return x\n\ndef last():\n    print(\"last\")\n    return x\n\nwith tf.Session() as s:\n    a = tf.Variable(tf.constant(0.),name=\"a\")\n    b = tf.Variable(tf.constant(0.),name=\"b\")\n    x = tf.constant(-1.)\n    calculate= cond(x.eval()==-1.,add,last)\n    val = s.run([calculate], {a: 1., b: 2.})\n    print(val) # 3\n    print(s.run([calculate],{a:3.,b:4.})) # 7\n    print(val) # 3\n"
    ],
    "start_time" : 1450063271,
    "end_time" : 1450074141,
    "date_range" : 0.125810185185185
},{
    "_id" : "5bd18c5dff0c64ead7ea442d",
    "ques_title" : "Running tensorflow on GPU cluster in virtualenv",
    "ques_body" : "<p>I installed the GPU version of tensorflow in a virtualenv following these <a href=\"https://www.tensorflow.org/versions/master/get_started/os_setup.html#virtualenv-installation\" rel=\"nofollow\">instructions</a>. The problem is, I am getting a segmentation fault upon starting a session. That is, this code:</p>\n\n<pre><code>import tensorflow as tf\nsess = tf.InteractiveSession()\n</code></pre>\n\n<p>exits with the following error: </p>\n\n<pre><code>(tesnsorflowenv)user@machine$ python testtensorflow.py \nI tensorflow/stream_executor/dso_loader.cc:101] successfully opened CUDA library libcublas.so.7.0 locally\nI tensorflow/stream_executor/dso_loader.cc:93] Couldn't open CUDA library libcudnn.so.6.5. LD_LIBRARY_PATH: :/vol/cuda/7.0.28/lib64\nI tensorflow/stream_executor/cuda/cuda_dnn.cc:1382] Unable to load cuDNN DSO\nI tensorflow/stream_executor/dso_loader.cc:101] successfully opened CUDA library libcufft.so.7.0 locally\nI tensorflow/stream_executor/dso_loader.cc:101] successfully opened CUDA library libcuda.so locally\nI tensorflow/stream_executor/dso_loader.cc:101] successfully opened CUDA library libcurand.so.7.0 locally\nI tensorflow/core/common_runtime/local_device.cc:40] Local device intra op parallelism threads: 40\nSegmentation fault\n</code></pre>\n\n<p>I tried to dig deeper using gdb but only got the following additional outputs:</p>\n\n<pre><code>[New Thread 0x7fffdf880700 (LWP 32641)]\n[New Thread 0x7fffdf07f700 (LWP 32642)]\n... lines omitted \n[New Thread 0x7fffadffb700 (LWP 32681)]\n[Thread 0x7fffadffb700 (LWP 32681) exited]\nProgram received signal SIGSEGV, Segmentation fault.\n0x0000000000000000 in ?? ()\n</code></pre>\n\n<p>Any ideas what is happening here and how to fix it?</p>\n\n<p>Here is the output of nvidia-smi:</p>\n\n<pre><code>+------------------------------------------------------+                       \n| NVIDIA-SMI 352.63     Driver Version: 352.63         |                       \n|-------------------------------+----------------------+----------------------+\n| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |\n| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |\n|===============================+======================+======================|\n|   0  Tesla K80           On   | 0000:06:00.0     Off |                    0 |\n| N/A   65C    P0   142W / 149W |    235MiB / 11519MiB |     81%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   1  Tesla K80           On   | 0000:07:00.0     Off |                    0 |\n| N/A   25C    P8    30W / 149W |     55MiB / 11519MiB |      0%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   2  Tesla K80           On   | 0000:0D:00.0     Off |                    0 |\n| N/A   27C    P8    26W / 149W |     55MiB / 11519MiB |      0%   Prohibited |\n+-------------------------------+----------------------+----------------------+\n|   3  Tesla K80           On   | 0000:0E:00.0     Off |                    0 |\n| N/A   25C    P8    28W / 149W |     55MiB / 11519MiB |      0%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   4  Tesla K80           On   | 0000:86:00.0     Off |                    0 |\n| N/A   46C    P0    85W / 149W |    206MiB / 11519MiB |     97%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   5  Tesla K80           On   | 0000:87:00.0     Off |                    0 |\n| N/A   27C    P8    29W / 149W |     55MiB / 11519MiB |      0%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   6  Tesla K80           On   | 0000:8D:00.0     Off |                    0 |\n| N/A   28C    P8    26W / 149W |     55MiB / 11519MiB |      0%   Prohibited |\n+-------------------------------+----------------------+----------------------+\n|   7  Tesla K80           On   | 0000:8E:00.0     Off |                    0 |\n| N/A   23C    P8    30W / 149W |     55MiB / 11519MiB |      0%   E. Process |\n+-------------------------------+----------------------+----------------------+\n</code></pre>\n\n<p>Thanks for any help on this issue! </p>\n",
    "Tags" : [
        "python",
        "install",
        "tensorflow"
    ],
    "ques_score" : "3",
    "ques_favoriate" : 0,
    "ques_creation_date" : "2016-01-13 15:24:08",
    "ques_closed_date" : "",
    "ans_body" : "<p>It's not finding CuDNN -</p>\n\n<blockquote>\n  <p>I tensorflow/stream_executor/dso_loader.cc:93] Couldn't open CUDA library > libcudnn.so.6.5. LD_LIBRARY_PATH: :/vol/cuda/7.0.28/lib64\n  I tensorflow/stream_executor/cuda/cuda_dnn.cc:1382] Unable to load cuDNN DSO</p>\n</blockquote>\n\n<p>You need to have it installed.  Please see <a href=\"https://www.tensorflow.org/versions/master/get_started/os_setup.html#optional-install-cuda-gpus-on-linux\" rel=\"nofollow\">the TensorFlow CUDA installation instructions</a></p>\n",
    "ans_score" : "4",
    "ans_favorite" : 0,
    "ans_create_date" : "2016-01-13 18:00:00",
    "ans_last_edit_date" : "",
    "ViewCount" : 4862,
    "upvote" : 3,
    "downvote" : 0,
    "ques_code" : [
        "import tensorflow as tf\nsess = tf.InteractiveSession()\n",
        "(tesnsorflowenv)user@machine$ python testtensorflow.py \nI tensorflow/stream_executor/dso_loader.cc:101] successfully opened CUDA library libcublas.so.7.0 locally\nI tensorflow/stream_executor/dso_loader.cc:93] Couldn't open CUDA library libcudnn.so.6.5. LD_LIBRARY_PATH: :/vol/cuda/7.0.28/lib64\nI tensorflow/stream_executor/cuda/cuda_dnn.cc:1382] Unable to load cuDNN DSO\nI tensorflow/stream_executor/dso_loader.cc:101] successfully opened CUDA library libcufft.so.7.0 locally\nI tensorflow/stream_executor/dso_loader.cc:101] successfully opened CUDA library libcuda.so locally\nI tensorflow/stream_executor/dso_loader.cc:101] successfully opened CUDA library libcurand.so.7.0 locally\nI tensorflow/core/common_runtime/local_device.cc:40] Local device intra op parallelism threads: 40\nSegmentation fault\n",
        "[New Thread 0x7fffdf880700 (LWP 32641)]\n[New Thread 0x7fffdf07f700 (LWP 32642)]\n... lines omitted \n[New Thread 0x7fffadffb700 (LWP 32681)]\n[Thread 0x7fffadffb700 (LWP 32681) exited]\nProgram received signal SIGSEGV, Segmentation fault.\n0x0000000000000000 in ?? ()\n",
        "+------------------------------------------------------+                       \n| NVIDIA-SMI 352.63     Driver Version: 352.63         |                       \n|-------------------------------+----------------------+----------------------+\n| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |\n| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |\n|===============================+======================+======================|\n|   0  Tesla K80           On   | 0000:06:00.0     Off |                    0 |\n| N/A   65C    P0   142W / 149W |    235MiB / 11519MiB |     81%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   1  Tesla K80           On   | 0000:07:00.0     Off |                    0 |\n| N/A   25C    P8    30W / 149W |     55MiB / 11519MiB |      0%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   2  Tesla K80           On   | 0000:0D:00.0     Off |                    0 |\n| N/A   27C    P8    26W / 149W |     55MiB / 11519MiB |      0%   Prohibited |\n+-------------------------------+----------------------+----------------------+\n|   3  Tesla K80           On   | 0000:0E:00.0     Off |                    0 |\n| N/A   25C    P8    28W / 149W |     55MiB / 11519MiB |      0%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   4  Tesla K80           On   | 0000:86:00.0     Off |                    0 |\n| N/A   46C    P0    85W / 149W |    206MiB / 11519MiB |     97%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   5  Tesla K80           On   | 0000:87:00.0     Off |                    0 |\n| N/A   27C    P8    29W / 149W |     55MiB / 11519MiB |      0%   E. Process |\n+-------------------------------+----------------------+----------------------+\n|   6  Tesla K80           On   | 0000:8D:00.0     Off |                    0 |\n| N/A   28C    P8    26W / 149W |     55MiB / 11519MiB |      0%   Prohibited |\n+-------------------------------+----------------------+----------------------+\n|   7  Tesla K80           On   | 0000:8E:00.0     Off |                    0 |\n| N/A   23C    P8    30W / 149W |     55MiB / 11519MiB |      0%   E. Process |\n+-------------------------------+----------------------+----------------------+\n"
    ],
    "ans_code" : [],
    "start_time" : 1452669848,
    "end_time" : 1452679200,
    "date_range" : 0.108240740740741
}]
class StackOverflow extends Component {

    state = {
        ques: a,
        selectedPr: null
    }
    // componentDidMount() {
    //     //     this.setState({ques: a})
    //     // }

    selectPr(pr) {
        return () => {
            this.setState({
                selectedPr: pr
            }, function () {

                this.props.setValue(pr, "StackOverflow");
            });
        }
    }
    /*fetchNext(id){
        var i = 0
        for( ; i<this.state.ques.length ; i++){
            if(this.state.ques[i]._id==id){
                break;
            }
        }
        return i+1<this.state.ques.length?this.state.ques[i+1]:{};
    }*/


    render() {
        return (
            <div className="app-root">
                <List>
                    {
                        this.state.ques.map(pr =>
                            <ListItem button key={pr.id} onClick={this.selectPr(pr)}>
                                <ListItemText primary={pr.ques_title}  />
                            </ListItem>
                        )
                    }
                </List>
            </div>
        );
    }
}

export default StackOverflow;
