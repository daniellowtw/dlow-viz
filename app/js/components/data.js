/*
* s: service name
* c: cluster name
* i: instance id (this should be unique in the service-instance namespace
*
* h: health
* v: version
* t: timestamp
*
* */
import _ from 'lodash';

const baseData = {
  serviceName : "Service",
  data: []
};

export default _.assign(baseData, {
  clusters: ["x","y", "z"],
  data:[
            {s: "a", c: "z", i: "a1", h: "1", v: "0.1", t: "1234"},
            {s: "a", c: "x", i: "a1", h: "1", v: "0.1", t: "1234"},
            {s: "a", c: "z", i: "a3", h: "1", v: "0.3", t: "1234"},
            {s: "b", c: "z", i: "b1", h: "1", v: "0.3", t: "1234"},
            {s: "b", c: "z", i: "b2", h: "1", v: "0.1", t: "1234"},
            {s: "b", c: "z", i: "b3", h: "1", v: "0.1", t: "1234"},
            {s: "b", c: "z", i: "b4", h: "1", v: "0.2", t: "1234"},
            {s: "b", c: "z", i: "b5", h: "1", v: "0.2", t: "1234"},
            {s: "c", c: "z", i: "c1", h: "1", v: "0.4", t: "1234"},
            {s: "c", c: "z", i: "c2", h: "1", v: "0.4", t: "1234"},
            {s: "c", c: "y", i: "c1", h: "1", v: "0.4", t: "1234"},
            {s: "c", c: "y", i: "c2", h: "1", v: "0.1", t: "1234"}
    ]
})