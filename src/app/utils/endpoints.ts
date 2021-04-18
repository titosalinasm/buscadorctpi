// import { EnvService } from '../env.service';

// let env = new EnvService();

export const END_POINTS = {

    lstgeneral: {
        actividad: '/lstgeneral/lsttodos',
        recurso: '/lstgeneral/lstrecurso'
    },
    busqueda :{
      lsttodos:'/busqueda/lsttodos',
      detalle: '/busqueda/lstdetalle',
      lstTodosAvanzado : '/busqueda/lstavanzado',
      lstpatentes: '/busqueda/lstpatentes',
      lstconocimientos: '/busqueda/lstconocimientos'
    },
    token:{
      oauth:'/oauth/token'
    },

};
