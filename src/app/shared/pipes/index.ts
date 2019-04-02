import { MapGetPipe } from './mapGet/map-get.pipe';
// import { GetConfigPipe } from 'app/app-config/core/src/get-config.pipe';
import { ConvertNumberToRomanNumeralPipe } from './convertNumberToRomanNumeral/convert-number-to-roman-numeral.pipe';
import { MapArrayPipe } from './mapArray/map-array.pipe';
import { SumArrayTablePipe } from './sumArrayTable/sum-array-table.pipe';
import { DonThuStatusPipe } from './don-thu-status.pipe';
import { NotificationPipe } from './notification.pipe';
import { TrangThaiBcthkqtn } from './trang-thai-bcthkqtn.pipe';

export const PIPES = [
  MapGetPipe,
  // GetConfigPipe,
  ConvertNumberToRomanNumeralPipe,
  MapArrayPipe,
  SumArrayTablePipe,
  DonThuStatusPipe,
  NotificationPipe,
  TrangThaiBcthkqtn
];

