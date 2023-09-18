import { CreateDocumentDto } from './create-document.dto';

export interface UpdateDocumentDto extends Partial<CreateDocumentDto> {
    uuid: string;
}
