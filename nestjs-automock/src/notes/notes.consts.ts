export const NOTES_CONTEXT = 'NOTES_CONTEXT';
export const NOTES_CHARGE = 50;
export const NOTES_AUDIT_MESSAGES = {
    noteCreated: () => 'New note has been created!' as const,
    noteUpdated: (id: number) => `Note (${id}) has been updated!` as const,
    noteRemoved: (id: number) => `Note (${id}) has been removed!` as const,
}
