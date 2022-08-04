import {Producer} from '@/store/slices/producerSlice';

export const getPixProducer = (producer: Producer) => {
  if (producer.randomPix) {
    return producer.randomPix;
  } else if (producer.phonePix) {
    return producer.phonePix;
  } else if (producer.emailPix) {
    return producer.emailPix;
  } else if (producer.cpfPix) {
    return producer.cpfPix;
  } else {
    return 'Não possui chave pix';
  }
};
